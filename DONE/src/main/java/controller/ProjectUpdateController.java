package controller;

import java.util.Map;

import annotation.Component;
import bind.DataBinding;
import dao.ProjectDao;
import vo.Project;

@Component("/project/update.do")
public class ProjectUpdateController implements DataBinding,Controller{

	ProjectDao projectDao = null;
	
	public ProjectUpdateController setProjectDao(ProjectDao projectDao) {
		this.projectDao = projectDao;
		return this;
	}
	
	
	@Override
	public String execute(Map<String, Object> model) throws Exception {
		Project project = (Project) model.get("project");
		
		if(project.getTitle()==null) {
			System.out.println(model.get("no"));
			Project projectNow = projectDao.selectOne((int)model.get("no"));
			System.out.println(projectNow.getNo());
			System.out.println(projectNow.getTitle());
			model.put("project", projectNow);
			return "/project/ProjectUpdate.jsp";
		}else {
			System.out.println(project.getNo());
			projectDao.update(project);
			return "redirect:list.do";
		}
	}

	@Override
	public Object[] getDataBinders() {
		return new Object [] {"project",vo.Project.class, "no", Integer.class};
	}

}
