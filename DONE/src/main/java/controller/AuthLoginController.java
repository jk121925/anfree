package controller;

import java.util.Map;


import javax.servlet.http.HttpSession;

import annotation.Component;
import dao.MysqlMemberDao;
import vo.Member;
import bind.DataBinding;


@Component("/auth/login.do")
public class AuthLoginController implements Controller,DataBinding {
	MysqlMemberDao memberDao;
	
	public AuthLoginController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	public Object [] getDataBinders() {
		return new Object[] {"authMember",vo.Member.class };
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MysqlMemberDao memberDao = (MysqlMemberDao) model.get("memberDao");
		Member authMember = (Member)model.get("authMember");
		System.out.println(authMember == null);
		System.out.println(authMember.getEmail());
		if(authMember.getEmail() == null) {
			return "/auth/LogInForm.jsp";
		}else {
			authMember = memberDao.exist(authMember.getEmail(), authMember.getPassword());
			if(authMember!=null) {
				HttpSession session = (HttpSession)model.get("session");
				session.setAttribute("member",authMember);
				return "redirect:../member/list.do";
			}else {
				return "/auth/LogInFail.jsp";
			}
		}
		
		
		
//		if(model.get("authMember") != null) {
//			Member authMember = (Member) model.get("authMember");
//			Member checkMember = memberDao.exist(authMember.getEmail(), authMember.getPassword());
//			if(checkMember == null) {
//				return "/auth/LogInFail.jsp";
//			}else {
////				model.put("correctMember", checkMember);
//				HttpSession session  = (HttpSession)model.get("session");
//				session.setAttribute("member", checkMember);
//				return "redirect:../member/list.do";
//			}
//		}else {
//			return "/auth/LogInForm.jsp";
//		}
	}

}
