package servlets;
import dao.MemberDao;
import java.io.IOException;
import java.sql.Connection;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MemberDeleteServlet
 */
@WebServlet("/member/delete")
public class MemberDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MemberDeleteServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn = null;
//		PreparedStatement stmt =null;
		
		try {
			ServletContext sc = this.getServletContext();
//			conn = (Connection)sc.getAttribute("conn");
//			MemberDao dao = new MemberDao();
//			dao.setConnection(conn);
			MemberDao dao = (MemberDao) sc.getAttribute("memberDao");
			
			dao.delete(Integer.parseInt(request.getParameter("no")));
			
//			stmt = conn.prepareStatement("DELETE FROM members WHERE MNO=?");
//			stmt.setInt(1, Integer.parseInt(request.getParameter("no")) );
//			stmt.executeUpdate();
			
			response.sendRedirect("list");
			
//			RequestDispatcher rd = request.getRequestDispatcher("list");
//			rd.forward(request, response);
			
		}catch(Exception e) {
//			try {if (stmt !=null) stmt.close();}catch(Exception stmtE){}
//			try {if (conn !=null) conn.close();}catch(Exception connE){}
			request.setAttribute("error", e);
			RequestDispatcher rd = request.getRequestDispatcher("/Error.jsp");
			rd.forward(request, response);
		}finally {

		}
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
