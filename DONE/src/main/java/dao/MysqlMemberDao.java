package dao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

import javax.sql.DataSource;

import vo.Member;
//import util.DBConnectionPool;


public class MysqlMemberDao implements MemberDao{
	/*
	 * cause knowing DBConnectionPoll Connection connection;
	 * 
	 * public void setConnection(Connection connection) { this.connection =
	 * connection; }
	 */	
	
	
	DataSource ds = null;
	/* USING CONNECTION POLL
	 * DBConnectionPool connPool = null;
	 * public void setDbConnectionPoll(DBConnectionPool connPool) { this.connPool =
	 * connPool; }
	 */
	
	public void setDataSource(DataSource ds) {
		this.ds=ds;
	}
	
	public List<Member> selectList() throws Exception{
		Connection connection = null;
		Statement stmt =null;
		ResultSet rs = null;
		
		try {
			connection =ds.getConnection();
			
			/*
			connection = connPool.getConnection();
			*/
			stmt = connection.createStatement();
			rs = stmt.executeQuery("SELECT MNO,MNAME,EMAIL,CRE_DATE FROM MEMBERS ORDER BY MNO ASC");
		
			ArrayList<Member> members = new ArrayList<Member>();
			
			while(rs.next()) {
				members.add(new Member().setNo(rs.getInt("MNO")).setName(rs.getString("MNAME")).setEmail(rs.getString("EMAIL")).setCreatedDate(rs.getDate("CRE_DATE")));
				
			}
			return members;
			
		}catch(Exception e){
			try {if(rs!=null) rs.close();}catch(Exception rsE) {}
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
			/* USING CONNPOOOL
			if(connection!=null) connPool.returnConnection(connection);
			*/
			
			throw e;
		}
		
		
	}
	
	public int insert(Member member) throws Exception{
		PreparedStatement stmt = null;
		Connection connection = null;
		int ret =1;
		try {
//			connection = connPool.getConnection();
			connection = ds.getConnection();
			stmt = connection.prepareStatement("INSERT INTO MEMBERS(EMAIL,PWD,MNAME,CRE_DATE,MOD_DATE) VALUES(?,?,?,NOW(),NOW())");
			stmt.setString(1, member.getEmail());
			stmt.setString(2, member.getPassword());
			stmt.setString(3, member.getName());
			return stmt.executeUpdate();
		}catch(Exception e) {
			try{if(stmt!=null) stmt.close();}catch(Exception stmtE) {};
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
//			if(connection!=null) connPool.returnConnection(connection);
		}
		return ret;
	}
	
	public int delete(int no) throws Exception{
		int ret = 1;
		Connection connection  =null;
		PreparedStatement stmt = null;
		
		try {
//			connection  = connPool.getConnection();
			connection = ds.getConnection();
			stmt = connection.prepareStatement("DELETE FROM MEMBERS WHERE MNO=?");
			stmt.setInt(1, no);
			return stmt.executeUpdate();
			
			
			
		}catch(Exception e) {
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
//			if(connection!=null) connPool.returnConnection(connection);
		return ret;
		}
	
	
	}
	
	public Member selectOne(int no) throws Exception{
		Statement stmt = null;
		ResultSet rs = null;
		Connection connection  =null;
		Member member = new Member();
		
		try {
//			connection = connPool.getConnection();
			connection = ds.getConnection();
			stmt = connection.createStatement();
			rs = stmt.executeQuery("SELECT MNO,EMAIL,MNAME,CRE_DATE FROM MEMBERS WHERE MNO=" + no);
			
			if(rs.next()) {
				member.setCreatedDate(rs.getDate("CRE_DATE")).setEmail(rs.getString("EMAIL")).setName(rs.getString("MNAME")).setNo(no);
				
			}
			return member;
			
			
		}catch(Exception e) {
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
//			if(connection!=null) connPool.returnConnection(connection);
			return null;
		}
		
		
	}//end selectOne
	
	public int update(Member member) throws Exception {
		PreparedStatement stmt= null;
		Connection connection = null;
		try {
//			connection = connPool.getConnection();
			connection = ds.getConnection();
			stmt = connection.prepareStatement("UPDATE MEMBERS SET EMAIL=?,MNAME=?,MOD_DATE=NOW() WHERE MNO=?");
			stmt.setString(1, member.getEmail());
			stmt.setString(2, member.getName());
			stmt.setInt(3, member.getNo());
			
			return stmt.executeUpdate();
			
			
			
		}catch(Exception e) {
			try {if(stmt!=null)stmt.close();}catch(Exception stmtE) {}
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
//			if(connection!=null) connPool.returnConnection(connection);
			return 0;
		}
		
	}
	
	public Member exist(String email, String password) throws Exception {
		Member member = new Member();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Connection connection = null;
		try {
//			connection = connPool.getConnection();
			connection = ds.getConnection();
			stmt = connection.prepareStatement("SELECT MNAME,EMAIL FROM MEMBERS WHERE EMAIL=? AND PWD=?");
			stmt.setString(1, email);
			stmt.setString(2, password);
			rs = stmt.executeQuery();
			if(rs.next()) {
				member.setName(rs.getString("MNAME")).setEmail(rs.getString("EMAIL"));
			}else {
				member=null;
			}
			return member;
		}catch(Exception e) {
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(connection!=null) connection.close();}catch(Exception connE) {}
//			if(connection!=null) connPool.returnConnection(connection);
			if(member!=null) member=null;
			return member;
		}
		
		
		
	}
	
	
	
	
	
}