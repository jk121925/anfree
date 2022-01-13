package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/AddTodo")
public class AddTodo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public AddTodo() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			System.out.println(request.getParameter("todo"));
			System.out.println(request.getParameter("want"));
			System.out.println(request.getParameter("force"));
			System.out.println(request.getParameter("no"));
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			conn = DriverManager.getConnection("jdbc:mysql://localhost/anfreedb","anfree_main","brokenwrist*0812");
			stmt = conn.prepareStatement("INSERT INTO TODO (TODO,WANT,FORCE_RATE,CATEGORY,TODAY,MNO) VALUES (?,?,?,?,NOW(),?)");
			stmt.setString(1, request.getParameter("todo"));
			stmt.setInt(2, Integer.parseInt(request.getParameter("want")));
			stmt.setInt(3, Integer.parseInt(request.getParameter("force")));
			stmt.setInt(4, 1);
			stmt.setInt(5, Integer.parseInt(request.getParameter("no")));
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}

}
