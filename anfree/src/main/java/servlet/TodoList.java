package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vo.Member;
import vo.Todo;

@WebServlet("/todolist")
public class TodoList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TodoList() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn =null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Member member = (Member) request.getAttribute("loginMember");
		ArrayList<Todo> todoLists = new ArrayList<Todo>();
		try {

			Class.forName(this.getInitParameter("driver"));
			conn = DriverManager.getConnection(this.getInitParameter("driver"),this.getInitParameter("username"),this.getInitParameter("password"));
			stmt = conn.prepareStatement("SELECT MNO,TODO,FORCING,START_TIME,STATE,END_TIME FROM TODO WHERE MNO=?");
			stmt.setInt(1, member.getNo());
			
			rs = stmt.executeQuery();
			
			while(rs.next()) {
				todoLists.add(new Todo().setMno(rs.getInt("MNO")).setTodo(rs.getString("TODO")).setForcing(rs.getInt("FORCING")).setState(rs.getInt("STATE")));
			}
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
