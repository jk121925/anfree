
import java.util.*;
import java.io.FileInputStream;


class Solution
{
	public static void main(String args[]) throws Exception
	{
		
		Scanner sc = new Scanner(System.in);
		int T;
		T=sc.nextInt();
		String dummy = sc.nextLine();

		for(int test_case = 1; test_case <= T; test_case++)
		{
			String [] input = sc.nextLine().split(" ");	
			int [] arr = new int [input[0].length()];
			int N = Integer.parseInt(input[1]);
			boolean [] visit = new boolean [arr.length];
			for(int i=0; i<arr.length; i++) {
				arr[i] = Integer.parseInt(input[0].substring(i, i+1));
			}
			boolean db = false;
			int cnt =0;
			for(int i=0; i<arr.length; i++) {
				int ch = -1;
				for(int j=i+1; j<arr.length; j++){
					if(arr[i]<=arr[j]) {
						if(ch==-1)ch = j;
						else if(arr[ch]<=arr[j])ch=j;
						if(arr[i] == arr[j]) db = true;
					}
				}
				if(ch == -1) continue;
				else {
					if(visit[i] && visit[ch] && cnt>=N) {
						swap(arr,i,ch);
						visit[i] =true;
						visit[ch] =true;
					}else if(cnt<N){
						swap(arr,i,ch);
						visit[i] =true;
						visit[ch] =true;
						cnt++;
					}
				}
			}
			if((N-cnt)%2 ==1 && !db) {
				swap(arr,arr.length-2,arr.length-1);
			}
			
			
			
			String out = "";
			for(int k=0; k<arr.length; k++) {
				out+=arr[k];
			}
			
			System.out.printf("#%d %s\n",test_case, out );

		}
	}
	
	
	public static void swap(int [] arr ,int x, int y) {
		int temp = arr[x];
		arr[x] = arr[y];
		arr[y] = temp;
	}
}