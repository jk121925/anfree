package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vo.Member;

@WebServlet("/login")
public class AuthLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public AuthLogin() {
        super();
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		RequestDispatcher rd = request.getRequestDispatcher("/Auth/login.jsp");
		rd.forward(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		
		try {
			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			stmt = conn.prepareStatement("SELECT MNO,NAME,ID FROM MEMBER WHERE ID = ? AND PASSWORD = ?");
			stmt.setString(1, request.getParameter("id"));
			stmt.setString(2, request.getParameter("password"));
			
			rs = stmt.executeQuery();
			HttpSession session = request.getSession();
			if(rs.next()) {
				session.setAttribute("loginMember", new Member ().setName(rs.getString("NAME")).setId(rs.getString("ID")).setNo(rs.getInt("MNO")));
			}else {
				session.setAttribute("loginMember", null);
			}
			
			response.sendRedirect("todolist");
//			RequestDispatcher rd = request.getRequestDispatcher("./");
//			rd.forward(request, response);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
















