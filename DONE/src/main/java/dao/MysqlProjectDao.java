package dao;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import annotation.Component;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;

import vo.Project;



@Component("projectDao")
public class MysqlProjectDao implements ProjectDao {

	DataSource ds = null;
	
	public void setDataSource(DataSource ds) {
		this.ds =ds;
	}
	
	
	
	@Override
	public List<Project> selectList() throws Exception {
		List<Project> projects = new ArrayList<Project>();
		Connection conn = null;
		Statement stmt =null;
		ResultSet rs = null;
		
		try {
			conn = ds.getConnection();
			stmt =conn.createStatement();
			rs = stmt.executeQuery("SELECT PNO,TITLE,PNAME,STA_DATE,END_DATE,STATE FROM PROJECTS ORDER BY STA_DATE ASC");
			while(rs.next()) {
				projects.add(new Project().setNo(rs.getInt("PNO")).setContent(rs.getString("PNAME"))
						.setStartDate(rs.getDate("STA_DATE")).setEndDate(rs.getDate("END_DATE")).setState(rs.getInt("STATE")).setTitle(rs.getString("TITLE")));
			}
			return projects;
			
			
		}catch(Exception e) {
			try {if(rs!=null) rs.close();}catch(Exception rsE) {}
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(conn!=null) conn.close();}catch(Exception connE) {}
			throw e;
		}
	}

}
