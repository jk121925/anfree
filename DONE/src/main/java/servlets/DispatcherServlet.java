package servlets;
import vo.Member;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import bind.DataBinding;
import bind.ServletRequestDataBinder;
import context.ApplicationContext;
import controller.AuthLogOutController;
import controller.AuthLoginController;
import controller.Controller;
import controller.MemberAddController;
import controller.MemberDeleteController;
import controller.MemberListController;
import controller.MemberUpdateController;
import listeners.ContextLoaderListener;
/**
 * Servlet implementation class DispatcherServlet
 */
@WebServlet("*.do")
public class DispatcherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset = UTF-8");
		String servletPath = request.getServletPath();
		try {
			
			/* USE PROPERTIES
			 * ServletContext sc = this.getServletContext();
			 */
			
			ApplicationContext ctx = ContextLoaderListener.getApplicationContext();
			
			
			HashMap<String,Object>model = new HashMap<String,Object>();
//			model.put("memberDao", sc.getAttribute("memberDao"));
			model.put("session", request.getSession());
			/* USER PROPERTIES
			 * Controller pageController= (Controller) sc.getAttribute(servletPath);
			 */
			
			Controller pageController = (Controller) ctx.getBean(servletPath);
			
			if(pageController ==null) {
				throw new Exception("요청한 서비스를 찾을 수 없습니다.");
			}
			
			if(pageController instanceof DataBinding) {
				prepareRequestData(request, model, (DataBinding)pageController);
			}
			
			
			
			
			/* USING DATABINDING AND REPLACE IT
			 * if("/member/list.do".equals(servletPath)) { // pageController = new
			 * MemberListController(); // pageControllerPath = "/member/list"; }else
			 * if("/member/add.do".equals(servletPath)) { // pageControllerPath =
			 * "/member/add"; // pageController = new MemberAddController();
			 * if(request.getParameter("email") !=null) { model.put("member",new
			 * Member().setEmail(request.getParameter("email")).setName(request.getParameter
			 * ("name")).setPassword(request.getParameter("password"))); //
			 * request.setAttribute("member", new
			 * Member().setEmail(request.getParameter("email")).setName(request.getParameter
			 * ("name")).setPassword(request.getParameter("password"))); }
			 * 
			 * }else if("/member/update.do".equals(servletPath)) { // pageControllerPath =
			 * "/member/update"; // pageController = new MemberUpdateController();
			 * if(request.getParameter("name")!=null) { model.put("member", new
			 * Member().setEmail(request.getParameter("email")).setName(request.getParameter
			 * ("name")).setNo(Integer.parseInt( request.getParameter("no")))); //
			 * request.setAttribute("member", new
			 * Member().setEmail(request.getParameter("email")).setName(request.getParameter
			 * ("name")).setPassword(request.getParameter("password"))); }else
			 * if(request.getParameter("name") == null) { model.put("no",
			 * Integer.parseInt(request.getParameter("no"))); // request.setAttribute("no",
			 * Integer.parseInt(request.getParameter("no"))); } }else
			 * if("/member/delete.do".equals(servletPath)) { // pageController = new
			 * MemberDeleteController(); model.put("no",
			 * Integer.parseInt(request.getParameter("no"))); // pageControllerPath
			 * ="/member/delete"; }else if("/auth/login.do".equals(servletPath)){ //
			 * pageController = new AuthLoginController(); if(request.getParameter("email")
			 * !=null && request.getParameter("password")!=null) { model.put("authMember",
			 * new Member().setEmail(request.getParameter("email")).setPassword(request.
			 * getParameter("password"))); } // pageControllerPath = "/auth/login"; }
			 */
			
			/*
			 * else if("/auth/logout.do".equals(servletPath)){
			 * 
			 * // pageController = new AuthLogOutController(); // pageControllerPath
			 * ="/auth/logout"; }
			 */
			
			/*
			 * RequestDispatcher rd = request.getRequestDispatcher(pageControllerPath);
			 * 
			 * rd.include(request, response);
			 * 
			 * String viewUrl = (String) request.getAttribute("viewUrl");
			 */
			String viewUrl = pageController.execute(model);
			
			for(String key: model.keySet()) {
				request.setAttribute(key, model.get(key));
			}
			
			if(viewUrl.startsWith("redirect:")) {
//				if(request.getAttribute("correctMember")!=null) {
//					HttpSession session  = request.getSession();
//					session.setAttribute("member", request.getAttribute("correctMember"));
//				}
				response.sendRedirect(viewUrl.substring(9));
				return;
			}
			/*else if(viewUrl.equals("/auth/logout.do")) {
				HttpSession session = request.getSession();
				session.invalidate();}*/
			else {
				RequestDispatcher rd = request.getRequestDispatcher(viewUrl);
				rd.include(request, response);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
			request.setAttribute("error",e);
			RequestDispatcher rd = request.getRequestDispatcher("/Error.jsp");
			rd.forward(request, response);
		}
	}
	
	
	
	private void prepareRequestData(HttpServletRequest request, HashMap<String,Object> model,DataBinding dataBinding) throws Exception {
		Object [] dataBinders = dataBinding.getDataBinders();
		String dataName = null;
		Class<?> dataType = null;
		Object dataObj = null;
		for (int i=0; i<dataBinders.length; i+=2) {
			dataName = (String) dataBinders[i];
			dataType = (Class<?>) dataBinders[i+1];
			dataObj = ServletRequestDataBinder.bind(request,dataType,dataName);
			model.put(dataName,dataObj);
		}
		
	}
	

}//end class










