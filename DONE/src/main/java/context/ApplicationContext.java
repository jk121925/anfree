package context;

import java.util.*;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.reflections.Reflections;

import annotation.Component;

import java.io.*;
import java.lang.reflect.Method;
public class ApplicationContext {
	Hashtable<String,Object> objTable = new Hashtable<String,Object>();
	
	public Object getBean(String key) {
		return objTable.get(key);
	}
	
	public ApplicationContext(String propertiesPath) throws Exception{
		Properties props = new Properties();
		props.load(new FileReader(propertiesPath));
	
		prepareObjects(props);
		prepareAnnotationObjects();
		injectDependency();
	}
	
	private void prepareAnnotationObjects() throws Exception{
		Reflections reflector = new Reflections("");
		Set<Class<?>> list = reflector.getTypesAnnotatedWith(Component.class);
		String key =null;
		for(Class<?> clazz : list) {
			key = clazz.getAnnotation(Component.class).value();
			objTable.put(key,clazz.newInstance());
		}
	}
	
	
	
	private void prepareObjects(Properties props) throws Exception{
		//Context는 key value <String, Object>로 자료를 보관하는 객체
		Context ctx = new InitialContext();
		String key = null;
		String value = null;
		
		for(Object item : props.keySet()) {
			key = (String)item;
			value = props.getProperty(key);
			if(key.startsWith("jndi.")) {
				objTable.put(key, ctx.lookup(value));
			}else {
				objTable.put(key, Class.forName(value).newInstance());
			}
		}
		
	}
	
	private void injectDependency() throws Exception{
		//각 memberDao와 같은 context level의 객체들이 필요한 곳에 주입해줘야 한다.
		//e.g. MemberListController는 memberDao가 필요하므로 memberDao를 주입해주는데
		//이때 set Method가 있게 되면 이를 call 해서 넣어준다.
		for(String key: objTable.keySet()) {
			if(!key.startsWith("jndi.")) {
				callSetter(objTable.get(key));
			}
		}
	}
	
	private void callSetter(Object obj) throws Exception{
		Object dependency = null;
		for(Method m : obj.getClass().getMethods()) {
			if(m.getName().startsWith("set")) {
				dependency = findObjectByType(m.getParameterTypes()[0]);
				if(dependency!=null) {
					m.invoke(obj, dependency);
				}
			}
		}
	}
	
	private Object findObjectByType(Class<?> type) {
		//이때 objTable value에 있는 값을 주입해 줌으로 memberDao -> MemberListController에게 주입
		for(Object obj : objTable.values()) {
			if(type.isInstance(obj)) {
				return obj;
			}
		}
		return null;
	}
	
	
}
