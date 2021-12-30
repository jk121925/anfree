package servlets;
import dao.MemberDao;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class MemberListServlet
 */
@WebServlet("/member/list")
public class MemberListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public MemberListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		Connection conn =null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try{
			
			ServletContext sc = this.getServletContext();
			//using ContextLoaderListener
//			conn = (Connection)sc.getAttribute("conn");
//			MemberDao memberDao = new MemberDao();
			//using ContextLoaderListener
			MemberDao memberDao = (MemberDao)sc.getAttribute("memberDao");
			
//			memberDao.setConnection(conn);
			request.setAttribute("members", memberDao.selectList());
//			stmt = conn.createStatement();
//			rs = stmt.executeQuery("select MNO,MNAME,EMAIL,CRE_DATE" + " from MEMBERS" +" order by MNO ASC");
			response.setContentType("text/html; charset = UTF-8");
//			ArrayList<Member> members = new ArrayList<Member>();
			
//			while(rs.next()) {
//				members.add(new Member().setNo(rs.getInt("MNO")).setName(rs.getString("MNAME")).setEmail(rs.getString("EMAIL")).setCreatedDate(rs.getDate("CRE_DATE")));
//				
//			}
			
			
//			request.setAttribute("members", members);
			
			RequestDispatcher rd = request.getRequestDispatcher("/member/MemberList.jsp");
			rd.include(request, response);
		
		}catch (Exception e){
			e.printStackTrace();
			try {if(rs!=null) rs.close();}catch(Exception rsE) {}
			try {if(stmt!=null) stmt.close();}catch(Exception stmtE) {}
			try {if(conn!=null) conn.close();}catch(Exception connE) {}
			
			
			request.setAttribute("error", e);
			RequestDispatcher rd = request.getRequestDispatcher("/Error.jsp");
			rd.forward(request, response);
		}
		
		
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}
	
	
	
	

}
