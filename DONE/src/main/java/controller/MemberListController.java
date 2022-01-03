package controller;

import java.util.Map;

import annotation.Component;
import dao.MysqlMemberDao;

@Component(value="/member/list.do")
public class MemberListController implements Controller {
	MysqlMemberDao memberDao;
	
	public MemberListController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MemberDao memberDao = (MemberDao)model.get("memberDao");
		model.put("members", memberDao.selectList());
		return "/member/MemberList.jsp";
	}

}
