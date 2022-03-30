
import java.util.*;


import java.io.FileInputStream;

class Solution

{	
	
	public static void main(String args[]) throws Exception
	{
		
		Scanner sc = new Scanner(System.in);
		int T;
		T=sc.nextInt();
		

		for(int test_case = 1; test_case <= T; test_case++)
		{
			long ret =0;
			int div = 20171109;
			int N = sc.nextInt();
			PriorityQueue<Integer> maxq = new PriorityQueue<Integer>(Collections.reverseOrder());
			PriorityQueue<Integer> minq = new PriorityQueue<Integer>();
			int mid = 0;
			maxq.add(sc.nextInt());
			for(int i=0; i<N; i++) {
				maxq.add(sc.nextInt());
				minq.add(sc.nextInt());
				if(maxq.peek() > minq.peek()) {
					int a = maxq.poll();
					int b = minq.poll();
					maxq.add(b);
					minq.add(a);
					
				}
				mid = maxq.peek();
				ret= (ret + mid%div)%div;
				System.out.println(maxq.toString());
				System.out.println(minq.toString());
				System.out.println(mid);
				
			}
			
			
			System.out.printf("#%d %d\n", test_case, ret);
			
		}
	}
	
	
	
}









