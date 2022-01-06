package controller;

import java.util.Map;

import annotation.Component;
import bind.DataBinding;
import dao.ProjectDao;

@Component("/project/delete.do")
public class ProjectDeleteController implements Controller, DataBinding {

	ProjectDao projectDao;
	
	public ProjectDeleteController setprojectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
		return this;
	}
	
	
	@Override
	public Object[] getDataBinders() {
		
		return new Object [] {"no", Integer.class};
	}

	@Override
	public String execute(Map<String, Object> model) throws Exception {
		projectDao.delete((int) model.get("no"));
		return "redirect:list.do";
	}

}
