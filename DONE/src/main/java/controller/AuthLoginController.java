package controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import dao.MysqlMemberDao;
import vo.Member;

public class AuthLoginController implements Controller {
	MysqlMemberDao memberDao;
	
	public AuthLoginController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MysqlMemberDao memberDao = (MysqlMemberDao) model.get("memberDao");
		if(model.get("authMember") != null) {
			Member authMember = (Member) model.get("authMember");
			Member checkMember = memberDao.exist(authMember.getEmail(), authMember.getPassword());
			if(checkMember == null) {
				return "/auth/LogInFail.jsp";
			}else {
//				model.put("correctMember", checkMember);
				HttpSession session  = (HttpSession)model.get("session");
				session.setAttribute("member", checkMember);
				return "redirect:../member/list.do";
			}
		}else {
			return "/auth/LogInForm.jsp";
		}
	}

}
