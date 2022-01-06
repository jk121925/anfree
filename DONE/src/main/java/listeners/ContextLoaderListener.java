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
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import context.ApplicationContext;
import controller.AuthLogOutController;
import controller.AuthLoginController;
import controller.MemberAddController;
import controller.MemberDeleteController;
import controller.MemberListController;
import controller.MemberUpdateController;
import dao.MysqlMemberDao;
import util.DBConnectionPool;
import java.io.*;
@WebListener
public class ContextLoaderListener implements ServletContextListener{
//	Connection conn;
// 	DB connectionPool 사용
//	DBConnectionPool connPool = null;
//	BasicDataSource ds = null;
	static ApplicationContext applicationContext;
	
	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}
	
	
	@Override
	public void contextInitialized(ServletContextEvent event) {
		try {
			System.out.println("Start ContextInitialization");
			// datasource used
//			ServletContext sc = event.getServletContext();
			
			
			/* connection poll
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));	
			connPool = new DBConnectionPool(sc.getInitParameter("driver"),sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			memberDao.setDbConnectionPoll(connPool); // must change order
			*/
			// datasource used
//			String propertiesPath = sc.getRealPath(sc.getInitParameter("contextConfigLocation"));
//			System.out.println("Call applicationContext : ContextLoader -> applicationContext");
//			applicationContext = new ApplicationContext(propertiesPath);
			
			applicationContext = new ApplicationContext();
			
			String resource = "dao/mybatis-config.xml";
			InputStream inputStream = Resources.getResourceAsStream(resource);
			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
			
			applicationContext.addBean("sqlSessionFactory", sqlSessionFactory);
			ServletContext sc = event.getServletContext();
			String propertiesPath = sc.getRealPath(sc.getInitParameter("contextConfigLocation"));
			applicationContext.prepareObjectByProperties(propertiesPath);
			applicationContext.prepareObjectsByAnnotation("");
			applicationContext.injectDependency();
			
			
			/* USE PROPERTIES
			 * InitialContext initialContext = new InitialContext(); DataSource ds =
			 * (DataSource)initialContext.lookup("java:/comp/env/jdbc/donedb");
			 */
			
			
			
			/* USE DATASOURE MANUALLY
			 * ds = new BasicDataSource();
			 * ds.setDriverClassName(sc.getInitParameter("driver"));
			 * ds.setUrl(sc.getInitParameter("url"));
			 * ds.setUsername(sc.getInitParameter("username"));
			 * ds.setPassword(sc.getInitParameter("password"));
			 */
			
			
			/* USE PROPERTIES
			 * MysqlMemberDao memberDao = new MysqlMemberDao(); memberDao.setDataSource(ds);
			 */
			
			/* use connection 
			memberDao.setConnection(conn);
			*/
			
			/* USE INDEPENDENT INJECTION, ERASE IT
			 * sc.setAttribute("memberDao", memberDao);
			 */			
			
			/* USE PROPERTIES
			 * sc.setAttribute("/auth/login.do", new
			 * AuthLoginController().setMemberDao(memberDao) );
			 * sc.setAttribute("/auth/logout.do", new AuthLogOutController());
			 * sc.setAttribute("/member/list.do", new
			 * MemberListController().setMemberDao(memberDao));
			 * sc.setAttribute("/member/add.do", new
			 * MemberAddController().setMemberDao(memberDao));
			 * sc.setAttribute("/member/delete.do", new
			 * MemberDeleteController().setMemberDao(memberDao));
			 * sc.setAttribute("/member/update.do", new
			 * MemberUpdateController().setMemberDao(memberDao));
			 */
		
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
