package controller;

import java.util.Map;

import annotation.Component;
import bind.DataBinding;
import dao.MysqlMemberDao;

@Component("/member/delete.do")
public class MemberDeleteController implements Controller, DataBinding {
	MysqlMemberDao memberDao;
	
	public MemberDeleteController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	public Object[] getDataBinders() {
		return new Object[] {"no", Integer.class};
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
