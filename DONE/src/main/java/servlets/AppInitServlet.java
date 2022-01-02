//package servlets;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//
//import javax.servlet.ServletConfig;
//import javax.servlet.ServletContext;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
//
///**
// * Servlet implementation class AppInitServlet
// */
////we don't need AppInitServlet cause all the connection from db is changed to listeners;
//public class AppInitServlet extends HttpServlet {
//	private static final long serialVersionUID = 1L;
//   
//
//	/**
//	 * @see Servlet#init(ServletConfig)
//	 */
//	public void init(ServletConfig config) throws ServletException {
//		System.out.println("AppInitServlet ready...");
//		super.init(config);
//		
//		try{
//			ServletContext sc = this.getServletContext();
//			Class.forName(sc.getInitParameter("driver"));
//			Connection conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
//			sc.setAttribute("conn", conn);
//			
//		}catch(Exception e) {
//			throw new ServletException(e);
//		}
//		
//		
//	}
//
//	/**
//	 * @see Servlet#destroy()
//	 */
//	public void destroy() {
//		System.out.println("AppInitServlet ending...");
//		super.destroy();
//		Connection conn = (Connection)this.getServletContext().getAttribute("conn");
//		
//		try {
//			if (conn!=null && conn.isClosed() == false) {
//				conn.close();
//			}
//		}catch(Exception e) {}
//		
//		
//	}
//
//}
