package controller;

import java.util.Map;

import annotation.Component;
import dao.MysqlMemberDao;
import vo.Member;
import bind.DataBinding;

@Component("/member/update.do")
public class MemberUpdateController implements Controller, DataBinding {
	MysqlMemberDao memberDao;
	
	public MemberUpdateController setMemberDao(MysqlMemberDao memberDao) {
		this.memberDao = memberDao;
		return this;
	}
	
	public Object[] getDataBinders() {
		return new Object[] {"no", Integer.class,"member",vo.Member.class};
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
//		MysqlMemberDao memberdao = (MysqlMemberDao) model.get("memberDao");
		Member member = (Member) model.get("member");
		if(member.getEmail()==null) {
			member = memberDao.selectOne((Integer)model.get("no"));
			model.put("member", member);
			return "/member/MemberUpdateForm.jsp";
		}else{
			memberDao.update(member);
			return "redirect:list.do";
		}
	}

}
