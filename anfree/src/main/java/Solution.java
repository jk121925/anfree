import java.util.*;



class Solution
{
	public static final int final_cnt = -1;
	public static final int  final_len = 9999999;
	public static int [] dy = {1,-1,0,0};
	public static int [] dx = {0,0,1,-1};
	public static int N;
	public static void main(String args[]) throws Exception
	{
		
		Scanner sc = new Scanner(System.in);
		int T;
		T=sc.nextInt();
		

		for(int test_case = 1; test_case <= T; test_case++)
		{
			N = sc.nextInt();
			int [][] arr = new int [N][N];
			
			for(int i=0; i<N; i++) {
				for(int j=0; j<N; j++) {
					arr[i][j] = sc.nextInt();
				}
			}
			
			for(int [] a : arr) {
				System.out.println(Arrays.toString(a));
			}
			
			
			
			
			
			
			
			
			
		}
	}
	
	
	
	public static void dfs(int now_num, int cnt, int len) {
		
	}
}




















