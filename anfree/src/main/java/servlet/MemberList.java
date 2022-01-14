package servlet;

import java.io.*;
import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import vo.Member;

@WebServlet("/member")
public class MemberList extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		ArrayList <Member> members = new ArrayList<Member>();
		
		try {
			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			stmt = conn.createStatement();
			rs = stmt.executeQuery("SELECT ID, NAME, CRE_DATE, SEX, TODOSTATE FROM MEMBER");

			while(rs.next()) {
				members.add(new Member().setCRE_DATE(rs.getDate("CRE_DATE")).setId(rs.getString("ID")).setName(rs.getString("Name")).setSex(rs.getString("SEX")).setTodoState(rs.getString("TODOSTATE")));
			}
			request.setAttribute("members", members);
			RequestDispatcher rd = request.getRequestDispatcher("/project/member.jsp");
			rd.include(request, response);
			
		}catch(Exception e) {
			
		}
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
