package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vo.Member;
import vo.Todo;

@WebServlet("/todolist")
public class TodoList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public TodoList() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Connection conn =null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<Todo> todoLists = new ArrayList<Todo>();
		try {

			ServletContext sc = this.getServletContext();
			Class.forName(sc.getInitParameter("driver"));
			conn = DriverManager.getConnection(sc.getInitParameter("url"),sc.getInitParameter("username"),sc.getInitParameter("password"));
			HttpSession session = request.getSession();
			Member member = (Member) session.getAttribute("loginMember");
			if(member.getNo() !=0) {
				stmt = conn.prepareStatement("SELECT m.mno, m.id, m.todostate, t.todo, t.start_time, t.state "
						+ "from member m "
						+ "inner join todo t "
						+ "on m.mno = t.mno "
						+ "where m.mno = ? AND date(t.start_time)=date(now())");
				stmt.setInt(1, member.getNo());
				
				rs = stmt.executeQuery();
				while(rs.next()) {
					todoLists.add(new Todo().setMno(rs.getInt("MNO")).setTodo(rs.getString("TODO")).setState(rs.getInt("STATE")));
				}		
			}
			session.setAttribute("loginMember", member);
			session.setAttribute("TodoLists", todoLists);
			response.sendRedirect("./");
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
