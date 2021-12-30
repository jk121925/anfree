package listeners;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;


import dao.MemberDao;
import util.DBConnectionPool;

@WebListener
public class ContextLoaderListener implements ServletContextListener{
//	Connection conn;
// 	DB connectionPool 사용
//	DBConnectionPool connPool = null;
//	BasicDataSource ds = null;
	
	
	@Override
	public void contextInitialized(ServletContextEvent event) {
		try {
			ServletContext sc = event.getServletContext();
			
			
			/* connection poll
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));	
			connPool = new DBConnectionPool(sc.getInitParameter("driver"),sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			memberDao.setDbConnectionPoll(connPool); // must change order
			*/
			
			InitialContext initialContext = new InitialContext();
			DataSource ds = (DataSource)initialContext.lookup("java:/comp/env/jdbc/donedb");
			
			
			
			/* USE DATASOURE MANUALLY
			 * ds = new BasicDataSource();
			 * ds.setDriverClassName(sc.getInitParameter("driver"));
			 * ds.setUrl(sc.getInitParameter("url"));
			 * ds.setUsername(sc.getInitParameter("username"));
			 * ds.setPassword(sc.getInitParameter("password"));
			 */
			MemberDao memberDao = new MemberDao();
			memberDao.setDataSource(ds);
			
			/* use connection 
			memberDao.setConnection(conn);
			*/
			
			sc.setAttribute("memberDao", memberDao);
			
		}catch(Throwable e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent event) {
//		이렇게되면 tomcat에서 자동으로 해제 가능
//		connPool.closeAll();
//		try {if(ds!=null) ds.close();} catch(SQLException e) {}
	}
	
	
}
