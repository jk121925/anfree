package controller;

import java.util.Map;

import annotation.Component;
import bind.DataBinding;
import dao.ProjectDao;
import vo.Project;

@Component("/project/add.do")
public class ProjectAddController implements Controller,DataBinding {

	ProjectDao projectDao;
	
	public ProjectAddController setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
		return this;
	}
	

	@Override
	public String execute(Map<String, Object> model) throws Exception {
		Project project = (Project) model.get("project");
		if(project.getContent() == null) {
			return "/project/ProjectAdd.jsp";
		}else {
			projectDao.insert(project);
			return "redirect:list.do";
		}
		
		
	}

	@Override
	public Object[] getDataBinders() {
		return new Object[] {"project",vo.Project.class};
	}

}
