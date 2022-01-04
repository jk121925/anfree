
import java.util.*;
import java.io.*;

public class alge {
	public static int [] arr;
	public static int [] buffer;
	public static BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	public static void main(String[] args) throws NumberFormatException, IOException {
		StringBuilder sb = new StringBuilder();
		int N = Integer.parseInt(bf.readLine());
		arr = new int [N];
		buffer = new int [N];
		for(int k=0; k<N; k++) {
			arr[k] = Integer.parseInt(bf.readLine());
		}
		mergeSort(arr,buffer,0,N-1);
		for(int n =0; n<N; n++) {
			sb.append(arr[n] + "\n");
		}
		System.out.print(sb);
	
	}
	
	public static void mergeSort(int [] arr, int [] buffer, int s, int e) {
		
		if(s<e) {
			int mid = (s+e)/2;
			mergeSort(arr,buffer,s,mid);
			mergeSort(arr,buffer,mid+1,e);
			innerSort(arr,buffer,s,e,mid);
		}
		
		
	}
	
	public static void innerSort(int [] arr, int [] buffer, int s, int e, int mid) {
		int i=s;
		int j=mid+1;
		int it =s;
		while(i<=mid && j<=e) {
			
			if(arr[i]<=arr[j]) {
				buffer[it] = arr[i];
				i++;
			}
			else{
				buffer[it] = arr[j];
				j++;
			}
			it++;
		}
		
		if(i>mid) {
			while(j<=e) {
				buffer[it] = arr[j];
				it++;
				j++;
			}
		}else {
			while(i<=mid) {
				buffer[it] = arr[i];
				it++;
				i++;
			}
		}

		for(int m=s; m<=e; m++) {
			arr[m] = buffer[m];
		}
	}
}






