package controller;

import java.util.*;

import annotation.Component;
import dao.MysqlProjectDao;
import dao.ProjectDao;
import vo.Project;

@Component("/project/list.do")
public class ProjectListController implements Controller{

	MysqlProjectDao projectDao;
	
	public ProjectListController setProjectDao(MysqlProjectDao projectDao) {
		this.projectDao = projectDao;
		return this;
	}

	@Override
	public String execute(Map<String, Object> model) throws Exception {
		model.put("projects", projectDao.selectList());
		return "/project/ProjectList.jsp";
	}


}
