package vo;

import java.sql.Date;

public class Member {
	private String id;
	private int password;
	private String name;
	private Date CRE_DATE;
	private Date MOD_DATE;
	private String sex;
	private String todoState;
	private int no;
	
	public int getNo() {
		return no;
	}
	public Member setNo(int no) {
		this.no = no;
		return this;
	}
	public String getTodoState() {
		return todoState;
	}
	public Member setTodoState(String todoState) {
		this.todoState = todoState;
		return this;
	}
	public String getId() {
		return id;
	}
	public Member setId(String id) {
		this.id = id;
		return this;
	}
	public int getPassword() {
		return password;
	}
	public Member setPassword(int password) {
		this.password = password;
		return this;
	}
	public String getName() {
		return name;
	}
	public Member setName(String name) {
		this.name = name;
		return this;
	}
	public Date getCRE_DATE() {
		return CRE_DATE;
	}
	public Member setCRE_DATE(Date cRE_DATE) {
		CRE_DATE = cRE_DATE;
		return this;
	}
	public Date getMOD_DATE() {
		return MOD_DATE;
	}
	public Member setMOD_DATE(Date mOD_DATE) {
		MOD_DATE = mOD_DATE;
		return this;
	}
	public String getSex() {
		return sex;
	}
	public Member setSex(String sex) {
		this.sex = sex;
		return this;
	}
}
