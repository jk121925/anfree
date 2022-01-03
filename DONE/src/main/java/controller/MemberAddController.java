package controller;
import bind.DataBinding;
import java.util.Map;

import annotation.Component;
import dao.MysqlMemberDao;
import vo.Member;

@Component("/member/add.do")
public class MemberAddController implements Controller , DataBinding{
	MysqlMemberDao memberDao;
	
	//Dao is injected by contextLoaderListener
	public MemberAddController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	public Object[] getDataBinders() {
		return new Object[] {"member", vo.Member.class};
	}
	
	
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
		
		Member member = (Member)model.get("member");
		
		if(member.getEmail() == null) {
			return "/member/MemberAddForm.jsp";
		}else {
			memberDao.insert(member);
			return "redirect:list.do";
		}
		
		
//		if(model.get("member")==null) {
//			return "/member/MemberAddForm.jsp";
//		}else {
////			MysqlMemberDao memberDao = (MysqlMemberDao)model.get("memberDao");
//			memberDao.insert(member);
//			return "redirect:list.do";
//		}
	}

}
