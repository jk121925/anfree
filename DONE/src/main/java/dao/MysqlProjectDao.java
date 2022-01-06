package dao;
import java.util.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import annotation.Component;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;

import vo.Project;



@Component("projectDao")
public class MysqlProjectDao implements ProjectDao {

	// Start mybatis //
	SqlSessionFactory sqlSessionFactory;
	
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		this.sqlSessionFactory = sqlSessionFactory;
	}
	
	@Override
	public List<Project> selectList() throws Exception{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			return sqlSession.selectList("dao.ProjectDao.selectList");
		}finally {
			sqlSession.close();
		}
	}

	@Override
	public int insert(Project project) throws Exception {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			int count =sqlSession.insert("dao.ProjectDao.insert",project);
			sqlSession.commit();
			return count;
		}finally {
			sqlSession.close();
		}
	}
	
	@Override
	public Project selectOne(int no) throws Exception {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			return sqlSession.selectOne("dao.ProjectDao.selectOne",no);
			
		}finally {
			sqlSession.close();
		}
	}
	@Override
	public int update(Project project) throws Exception {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			int count = sqlSession.update("dao.ProjectDao.update", project);
			sqlSession.commit();
			return count;
		}finally {
			sqlSession.close();
		}
	}
	@Override
	public int delete(int no) throws Exception {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			int count = sqlSession.delete("dao.ProjectDao.delete",no);
			sqlSession.commit();
			return count;
		}finally {
			sqlSession.close();
		}
		
	}
	
	
	
	
	
	
	
	/* USE DATASOURCE FROM JDBC
	 * DataSource ds = null; //done at ContextServlet public void
	 * setDataSource(DataSource ds) { this.ds =ds; }
	 * @Override public List<Project> selectList() throws Exception { List<Project>
	 * projects = new ArrayList<Project>(); Connection conn = null; Statement stmt
	 * =null; ResultSet rs = null;
	 * 
	 * try { conn = ds.getConnection(); stmt =conn.createStatement(); rs = stmt.
	 * executeQuery("SELECT PNO,PNAME,CONTENT,STA_DATE,END_DATE,STATE FROM PROJECTS ORDER BY PNO ASC"
	 * ); while(rs.next()) { projects.add(new
	 * Project().setNo(rs.getInt("PNO")).setContent(rs.getString("CONTENT")).
	 * setTitle(rs.getString("PNAME"))
	 * .setStartDate(rs.getDate("STA_DATE")).setEndDate(rs.getDate("END_DATE")).
	 * setState(rs.getInt("STATE"))); } return projects;
	 * 
	 * 
	 * }catch(Exception e) { try {if(rs!=null) rs.close();}catch(Exception rsE) {}
	 * try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {} try
	 * {if(conn!=null) conn.close();}catch(Exception connE) {} throw e; } }
	 * 
	 * 
	 * 
	 * @Override public int insert(Project project) throws Exception { Connection
	 * conn = null; PreparedStatement stmt =null; try { conn = ds.getConnection();
	 * stmt = conn.
	 * prepareStatement("INSERT INTO PROJECTS (PNAME,CONTENT,STA_DATE,END_DATE,STATE,CRE_DATE,TAGS) VALUES (?,?,?,?,0,NOW(),?)"
	 * ); stmt.setString(1, project.getTitle()); stmt.setString(2,
	 * project.getContent()); stmt.setDate(3, new
	 * java.sql.Date(project.getStartDate().getTime())); stmt.setDate(4, new
	 * java.sql.Date(project.getEndDate().getTime())); stmt.setString(5,
	 * project.getTags()); return stmt.executeUpdate(); }catch (Exception e){ try
	 * {if(stmt!=null) stmt.close();}catch(Exception stmtE) {} try {if(conn!=null)
	 * conn.close();}catch(Exception connE) {} throw e; }
	 * 
	 * 
	 * }
	 * 
	 * 
	 * 
	 * @Override public Project selectOne(int no) throws Exception { Connection conn
	 * =null; PreparedStatement stmt = null; ResultSet rs = null;
	 * 
	 * try { conn = ds.getConnection(); stmt = conn.
	 * prepareStatement("SELECT PNO,PNAME,CONTENT,STA_DATE,END_DATE,STATE,TAGS FROM PROJECTS WHERE PNO=?"
	 * ); stmt.setInt(1, no); rs = stmt.executeQuery(); if(rs.next()) {
	 * System.out.println(rs.getString("PNO")); return new Project
	 * ().setContent(rs.getString("CONTENT")).setTitle(rs.getString("PNAME")).
	 * setStartDate(rs.getDate("STA_DATE"))
	 * .setEndDate(rs.getDate("END_DATE")).setTags(rs.getString("TAGS")).setState(rs
	 * .getInt("STATE")).setNo(rs.getInt("PNO")); } }catch(Exception e) { try
	 * {if(rs!=null) rs.close();}catch(Exception rsE) {} try {if(stmt!=null)
	 * stmt.close();}catch(Exception stmtE) {} try {if(conn!=null)
	 * conn.close();}catch(Exception connE) {} return null; } return null;
	 * 
	 * }
	 * 
	 * 
	 * 
	 * @Override public int update(Project project) throws Exception { Connection
	 * conn =null; PreparedStatement stmt=null;
	 * 
	 * try { conn = ds.getConnection(); stmt = conn.
	 * prepareStatement("UPDATE PROJECTS SET PNAME=?, CONTENT=?, STA_DATE=?,END_DATE=?, STATE=?, TAGS=? WHERE PNO=?"
	 * ); stmt.setString(1, project.getTitle()); stmt.setString(2,
	 * project.getContent()); stmt.setDate(3, new
	 * java.sql.Date(project.getStartDate().getTime())); stmt.setDate(4, new
	 * java.sql.Date(project.getEndDate().getTime())); stmt.setInt(5,
	 * project.getState()); stmt.setString(6, project.getTags()); stmt.setInt(7,
	 * project.getNo()); System.out.println(project.getNo()); return
	 * stmt.executeUpdate();
	 * 
	 * 
	 * 
	 * }catch(Exception e) { try {if(stmt!=null) stmt.close();}catch(Exception
	 * stmtE) {} try {if(conn!=null) conn.close();}catch(Exception connE) {} }
	 * return 0; }
	 * 
	 * public int delete(int no) throws Exception{ Connection conn=null;
	 * PreparedStatement stmt = null;
	 * 
	 * try { conn = ds.getConnection(); stmt
	 * =conn.prepareStatement("DELETE FROM PROJECTS WHERE PNO=?"); stmt.setInt(1,
	 * no); return stmt.executeUpdate(); }catch(Exception e) { try {if(stmt!=null)
	 * stmt.close();}catch(Exception stmtE) {} try {if(conn!=null)
	 * conn.close();}catch(Exception connE) {} throw e; }
	 * 
	 * 
	 * }
	 */
	
	
	
	
	
}
