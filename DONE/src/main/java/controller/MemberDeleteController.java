package controller;

import java.util.Map;

import dao.MysqlMemberDao;

public class MemberDeleteController implements Controller {
	MysqlMemberDao memberDao;
	
	public MemberDeleteController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MysqlMemberDao memberDao = (MysqlMemberDao) model.get("memberDao");
		if(model.get("no")!=null) {
			memberDao.delete((int)model.get("no"));
		}
		return "redirect:list.do";
	}

}
