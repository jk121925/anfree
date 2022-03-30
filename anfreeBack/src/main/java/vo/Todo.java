package vo;

import java.io.Serializable;
import java.sql.Date;

public class Todo implements Serializable{
	private static final long serialVersionUID = 1L;
	private int mno;
	private String todo;
	private int forcing;
	private Date startTime;
	private Date endTime;
	private int state;
	
	public int getMno() {
		return mno;
	}
	public Todo setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public String getTodo() {
		return todo;
	}
	public Todo setTodo(String todo) {
		this.todo = todo;
		return this;
	}
	public int getForcing() {
		return forcing;
	}
	public Todo setForcing(int forcing) {
		this.forcing = forcing;
		return this;
	}
	public Date getStartTime() {
		return startTime;
	}
	public Todo setStartTime(Date startTime) {
		this.startTime = startTime;
		return this;
	}
	public Date getEndTime() {
		return endTime;
	}
	public Todo setEndTime(Date endTime) {
		this.endTime = endTime;
		return this;
	}
	public int getState() {
		return state;
	}
	public Todo setState(int state) {
		this.state = state;
		return this;
	}

	
}
