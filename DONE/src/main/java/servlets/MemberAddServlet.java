//package servlets;
//import dao.MysqlMemberDao;
//import vo.Member;
//
//import java.io.IOException;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//
//import javax.servlet.RequestDispatcher;
//import javax.servlet.ServletContext;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Servlet implementation class MemberAddServlet
// */
//@WebServlet("/member/add")
//public class MemberAddServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
//    public MemberAddServlet() {
//        super();
//        // TODO Auto-generated constructor stub
//    }
//
//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		request.setAttribute("viewUrl", "/member/MemberAddForm.jsp");
//		
//		/*
//		 * try { RequestDispatcher rd =
//		 * request.getRequestDispatcher("/member/MemberAddForm.jsp");
//		 * rd.include(request, response); }catch(Exception e) { throw new
//		 * ServletException(e); }
//		 */		
//		
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		
//		
//		request.setCharacterEncoding("UTF-8");
//		Connection conn = null;
////		PreparedStatement stmt = null;
//		
//		
//		try {
//			ServletContext sc = this.getServletContext();
////			Class.forName(sc.getInitParameter("driver"));
////			conn = (Connection)sc.getAttribute("conn");
////			MemberDao dao = new MemberDao();
//			MysqlMemberDao dao =(MysqlMemberDao) sc.getAttribute("memberDao");
//			Member member = new Member().setEmail(request.getParameter("email")).setName(request.getParameter("name")).setPassword(request.getParameter("password"));
//			dao.insert(member);
//			request.setAttribute("viewUrl", "redirect:list.do");
////			dao.setConnection(conn);
//			
//			
////			stmt = conn.prepareStatement("INSERT INTO MEMBERS(EMAIL,PWD,MNAME,CRE_DATE,MOD_DATE)" + " VALUES(?,?,?,NOW(),NOW())");
////			stmt.setString(1, request.getParameter("email"));
////			stmt.setString(2, request.getParameter("password"));
////			stmt.setString(3, request.getParameter("name")); 
////			stmt.executeUpdate();
//
//			/*
//			 * RequestDispatcher rd =
//			 * request.getRequestDispatcher("/member/MemberAddSuccess.jsp");
//			 * rd.forward(request, response);
//			 */
//			
//		}catch(Exception e) {
//			e.printStackTrace();
////			try {if (stmt !=null) stmt.close();} catch(Exception stmtE) {}
//			request.setAttribute("error", e);
//			RequestDispatcher rd = request.getRequestDispatcher("/Error.jsp");
//			rd.forward(request,response);
//
//		}
//		
//	}
//
//}
