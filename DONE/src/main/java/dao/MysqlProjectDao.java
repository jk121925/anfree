package dao;
import java.util.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import annotation.Component;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;

import vo.Project;



@Component("projectDao")
public class MysqlProjectDao implements ProjectDao {

	DataSource ds = null;
	//done at ContextServlet
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
			rs = stmt.executeQuery("SELECT PNO,PNAME,CONTENT,STA_DATE,END_DATE,STATE FROM PROJECTS ORDER BY STA_DATE ASC");
			while(rs.next()) {
				projects.add(new Project().setNo(rs.getInt("PNO")).setContent(rs.getString("CONTENT")).setTitle(rs.getString("PNAME"))
						.setStartDate(rs.getDate("STA_DATE")).setEndDate(rs.getDate("END_DATE")).setState(rs.getInt("STATE")));
			}
			return projects;
			
			
		}catch(Exception e) {
			try {if(rs!=null) rs.close();}catch(Exception rsE) {}
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(conn!=null) conn.close();}catch(Exception connE) {}
			throw e;
		}
	}



	@Override
	public int insert(Project project) throws Exception {
		Connection conn = null;
		PreparedStatement stmt =null;
		try {
			conn = ds.getConnection();
			stmt = conn.prepareStatement("INSERT INTO PROJECTS (PNAME,CONTENT,STA_DATE,END_DATE,STATE,CRE_DATE,TAGS) VALUES (?,?,?,?,0,NOW(),?)");
			stmt.setString(1, project.getTitle());
			stmt.setString(2, project.getContent());
			stmt.setDate(3, new java.sql.Date(project.getStartDate().getTime()));
			stmt.setDate(4, new java.sql.Date(project.getEndDate().getTime()));
			stmt.setString(5, project.getTags());
			return stmt.executeUpdate();
		}catch (Exception e){
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(conn!=null) conn.close();}catch(Exception connE) {}
			throw e;
		}
		
		
	}

	
	
	
	
}
