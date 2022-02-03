package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

@WebServlet("/join")
public class AuthJoin extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AuthJoin() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher rd = request.getRequestDispatcher("/Auth/join.jsp");
		rd.include(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn =null;
		PreparedStatement stmt = null;
		
		
		try {
			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			stmt = conn.prepareStatement("INSERT INTO MEMBER (ID, PASSWORD, NAME, CRE_DATE, SEX) VALUES(?,?,?, DATE(NOW()),? )");
			stmt.setString(1, request.getParameter("id"));
			stmt.setString(2, request.getParameter("password"));
			stmt.setString(3, request.getParameter("name"));
			int sex = (((String)request.getParameter("male")).equals("male"))? 1:0;
			stmt.setInt(4, sex);
			stmt.execute();

			response.sendRedirect("./");

		}catch(Exception e) {
			
		}
		
	}

}













