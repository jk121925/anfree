import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Solution {
	
	private final static int MAX_INPUT = 100000;
	private final static int MAX_NUM = 30000;
	
	private final static UserSolution usersolution = new UserSolution();
	
	private static BufferedReader br;
	
	private static int[] input = new int[MAX_INPUT];
	private static long seed = 13410;
	
	private static long pseudoRand() {
		seed = (seed * 214013 + 2531011) & 0xffffffffL;
		return (seed>>11) % MAX_NUM;
	}
	
	private static void makeInput(int inputLen) {
		for(int i = 0; i < inputLen; i++) {
			input[i] = (int)(pseudoRand());
		}
	}
	
	private static int run() throws Exception {
		int score = 100;
		int N, userNum, uID = 0, ret, sum, ans;
		int[] result = new int[10];
		String str;
		
		str = br.readLine();
		N = Integer.parseInt(str);
		
		for(int i = 0; i < N; i++) {
			str = br.readLine();
			userNum = Integer.parseInt(str);
			makeInput(userNum);
			
			for(int j = 0; j < userNum; j++) {
				usersolution.addUser(uID++, input[j]);
			}
			ret = usersolution.getTop10(result);
			
			sum = 0;
			for(int j = 0; j < ret; j++) {
				sum += result[j];
			}
			
			str = br.readLine();
			ans = Integer.parseInt(str);	
			System.out.println(ans + " "+ sum);
			if(sum != ans) {
				score = 0;
			}
		}
		return score;
	}
	public static void main(String[] args) throws Exception {
		int TC;
		//System.setIn(new java.io.FileInputStream("res/sample_input.txt"));
		
		br = new BufferedReader(new InputStreamReader(System.in));
		String str = br.readLine();
		TC = Integer.parseInt(str);
		
		for (int tc = 1; tc <= TC; tc++) {
			usersolution.init();
			System.out.println("#" + tc + " " + run());
		}
	}
}


class UserSolution {

	int MAX_INPUT = 100000;
	int heap[][];
	int heapSize;
	public void init() {
		heapSize = 0;
		heap = new int [MAX_INPUT][2];
		
	}
	
	public void addUser(int uID, int income) {
		int [] add = new int [] {uID, income};
		int current = heapSize;
		
		heap[current] = add;
		while(current>0 && heap[current][1]>=heap[(current-1)/2][1]) {
			if(heap[current][1]>heap[(current-1)/2][1]) {
				int [] temp = heap[current];
				heap[current] = heap[(current-1)/2];
				heap[(current-1)/2] = temp;
			}else if(heap[current][0]<heap[(current-1)/2][0]) {
				int [] temp = heap[current];
				heap[current] = heap[(current-1)/2];
				heap[(current-1)/2] = temp;
			}
			current = (current-1)/2;
		}
		heapSize++;

		
		
		
	}
	
	int getTop10(int[] result) {
		int ret =0;
		int cnt =0;
		
		Queue<Integer> q = new LinkedList<Integer>();
		q.add(0);
		while(cnt !=10 ) {
			if(cnt!=0 && heap[cnt][1]==0)break;
			int now = q.poll();
			result[cnt] = heap[now][0];
			cnt++;
			ret++;
			if(heap[now*2+2][1]!=0) q.add(now*2+2);
			if(heap[now*2+1][1]!=0)q.add(now*2+1);

		}
		
		return ret;
	}
}









