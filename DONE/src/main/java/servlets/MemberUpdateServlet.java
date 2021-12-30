package servlets;
import dao.MemberDao;
import vo.Member;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MemberUpdatesServlet
 */

@WebServlet("/member/update")
public class MemberUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
//    /**
//     * @see HttpServlet#HttpServlet()
//     */
    public MemberUpdateServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

//	/**
//	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Connection conn = null;
//		Statement stmt = null;
//		ResultSet rs = null;
		Member member = new Member();
		try {
			
			ServletContext sc = this.getServletContext();
//			conn = (Connection)sc.getAttribute("conn");
//			stmt = conn.createStatement();
//			MemberDao dao = new MemberDao();
//			dao.setConnection(conn);
			MemberDao dao = (MemberDao)sc.getAttribute("memberDao");
			
			member = dao.selectOne(Integer.parseInt(request.getParameter("no")));
			
			if(member !=null) {
				request.setAttribute("member", member);
				RequestDispatcher rd = request.getRequestDispatcher("/member/MemberUpdateForm.jsp");
				rd.include(request, response);
			}
			
			
//			rs = stmt.executeQuery("SELECT MNO,EMAIL,MNAME,CRE_DATE from MEMBERS" + " WHERE MNO=" + request.getParameter("no"));
//			if(rs.next()) {
//				Member member = new Member();
//				member.setEmail(rs.getString("EMAIL")).setName(rs.getString("MNAME")).setCreatedDate(rs.getDate("CRE_DATE")).setNo(rs.getInt("MNO"));
//				request.setAttribute("member", member);
//				
//				RequestDispatcher rd = request.getRequestDispatcher("/member/MemberUpdateForm.jsp");
//				rd.include(request, response);
//			}

			
		}catch(Exception e) {
			e.printStackTrace();
//			try {if(rs!=null) rs.close();}catch(Exception rsE) {}
//			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
//			try {if(conn!=null) conn.close();}catch(Exception connE) {}
			
			request.setAttribute("error", e);
			RequestDispatcher rd = request.getRequestDispatcher("/Error.jsp");
			rd.forward(request, response);
		}
		
	}

//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		request.setCharacterEncoding("UTF-8");
//		Connection conn = null;
//		PreparedStatement stmt =null;
		Member member = new Member();
		try {
			
			ServletContext sc = this.getServletContext();
//			conn = (Connection)sc.getAttribute("conn");
//			Class.forName(sc.getInitParameter("driver"));
//			MemberDao dao = new MemberDao();
//			dao.setConnection(conn);
			MemberDao dao = (MemberDao)sc.getAttribute("memberDao");
			member.setEmail(request.getParameter("email")).setName(request.getParameter("name")).setNo(Integer.parseInt(request.getParameter("no")));
			dao.update(member);
			
			
//			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
//			stmt = conn.prepareStatement("UPDATE MEMBERS SET EMAIL=?,MNAME=?,MOD_DATE=now()" + " WHERE MNO=?");
//			stmt.setString(1, request.getParameter("email"));
//			stmt.setString(2, request.getParameter("name"));
//			stmt.setInt(3, Integer.parseInt(request.getParameter("no")));
//			stmt.executeUpdate();
			response.sendRedirect("list");

		}catch(Exception e) {
			throw new ServletException(e);
		}finally {
//			try {if(stmt!=null) stmt.close();}catch(Exception e) {}
//			try {if(conn!=null) conn.close();}catch(Exception e) {}
		}
		
		
		
		
	}

}
