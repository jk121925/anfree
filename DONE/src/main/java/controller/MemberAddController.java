package controller;

import java.util.Map;
import dao.MysqlMemberDao;
import vo.Member;
public class MemberAddController implements Controller {
	MysqlMemberDao memberDao;
	
	public MemberAddController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
		if(model.get("member")==null) {
			return "/member/MemberAddForm.jsp";
		}else {
//			MysqlMemberDao memberDao = (MysqlMemberDao)model.get("memberDao");
			Member member = (Member)model.get("member");
			memberDao.insert(member);
			return "redirect:list.do";
		}
	}

}
