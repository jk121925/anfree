package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vo.Member;


@WebServlet("/AddTodo")
public class TodoAdd extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TodoAdd() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn = null; 
		PreparedStatement stmt = null;
		try {
			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			stmt = conn.prepareStatement("INSERT INTO TODO (TODO,FORCING,START_TIME,MNO) VALUES (?,?,NOW(),?)");
			stmt.setString(1, request.getParameter("todo"));
			stmt.setInt(2, Integer.parseInt(request.getParameter("force")));
			stmt.setInt(3, Integer.parseInt(request.getParameter("no")));
			stmt.executeUpdate();
			
			HttpSession session = request.getSession();
			session.setAttribute("loginMember", new Member().setNo(Integer.parseInt(request.getParameter("no"))));
			response.sendRedirect("todolist");
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

}
