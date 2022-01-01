package servlets;
import dao.MysqlMemberDao;
import vo.Member;

import java.io.IOException;
import java.sql.Connection;


import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * Servlet implementation class LogInServelt
 */
@WebServlet("/auth/login")
public class LogInServelt extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LogInServelt() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("viewUrl", "/auth/LogInForm.jsp");
//		RequestDispatcher rd = request.getRequestDispatcher("/auth/LogInForm.jsp");
//		rd.forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		Connection conn =null;
//		PreparedStatement stmt =null;
//		ResultSet rs = null;
		
		try {
			ServletContext sc = this.getServletContext();
//			conn = (Connection)sc.getAttribute("conn");
//			MemberDao dao = new MemberDao();
//			dao.setConnection(conn);
			MysqlMemberDao dao = (MysqlMemberDao)sc.getAttribute("memberDao");
			Member member = dao.exist(request.getParameter("email"), request.getParameter("password"));
			
			if(member!=null) {
				HttpSession session = request.getSession();
				session.setAttribute("member", member);
//				response.sendRedirect("../member/list");
				request.setAttribute("viewUrl", "redirect:../member/list.do");
			}else {
				request.setAttribute("viewUrl", "/auth/LogInFail.jsp");
//				RequestDispatcher rd = request.getRequestDispatcher("/auth/LogInFail.jsp");
//				rd.forward(request, response);
			}
			
			
			
//			stmt = conn.prepareStatement("SELECT MNAME,EMAIL FROM MEMBERS" + " WHERE EMAIL=? AND PWD=?");
//			stmt.setString(1, request.getParameter("email"));
//			stmt.setString(2, request.getParameter("password"));
//			rs = stmt.executeQuery();
			
//			if(rs.next()) {
//				Member member = new Member().setEmail(rs.getString("EMAIL")).setName(rs.getString("MNAME"));
//				HttpSession session  = request.getSession();
//				session.setAttribute("member", member);
//				response.sendRedirect("../member/list");
//			}else {
//				RequestDispatcher rd = request.getRequestDispatcher("/auth/LogInFail.jsp");
//				rd.forward(request, response);
//			}
		}catch(Exception e) {
			throw new ServletException(e);
		}
		
		
		
	}

}
