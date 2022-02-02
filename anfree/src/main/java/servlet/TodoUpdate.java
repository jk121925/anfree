package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vo.Member;


@WebServlet("/todoupdate")
public class TodoUpdate extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public TodoUpdate() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Connection conn = null;
		PreparedStatement stmt = null;
		HttpSession session = request.getSession();
		Member member= (Member) session.getAttribute("loginMember");

		try {
			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			stmt = conn.prepareStatement("UPDATE TODO SET STATE = 0, END_TIME = DATE(NOW()) WHERE MNO = ? AND START_TIME = DATE(NOW()) AND TODO = ?");
			stmt.setInt(1,member.getNo());
			stmt.setString(2, (String) request.getParameter("todo"));
			stmt.execute();

			response.sendRedirect("./todolist");
		}catch(Exception e) {
			
		}

		
	}

}
