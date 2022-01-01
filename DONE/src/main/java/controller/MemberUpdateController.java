package controller;

import java.util.Map;

import dao.MysqlMemberDao;
import vo.Member;

public class MemberUpdateController implements Controller {
	MysqlMemberDao memberDao;
	
	public MemberUpdateController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MysqlMemberDao memberdao = (MysqlMemberDao) model.get("memberDao");
		if(model.get("no") != null) {
			Member member = memberDao.selectOne((Integer)model.get("no"));
			model.put("member", member);
			return "/member/MemberUpdateForm.jsp";
		}else {
			Member member = (Member) model.get("member");
			memberDao.update(member);
			return "redirect:list.do";
		}
	}

}
