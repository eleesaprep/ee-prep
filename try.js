// INSTRUCTIONS:
// - Use javascript or ruby
// - Don’t use any AI tools like chatgpt or GitHub copilot
// - You have 30 minutes to finish the challenge
// - Use any Editor of your choice e.g vscode or replit
// - feel free to ask for clarification if you don't understand anything about the question


// **Dif two arrays**

// Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference between the two arrays.

// You can return the array with its elements in any order.

// ******************Example 1:******************

// ```
// Input: nums1 = [1,2,3], nums2 = [2,4,6]
// Output: [[1,3],[4,6]]
let nums1 = [1,2,3];
let nums2 = [2,4,6];

function Sorting(nums1, nums2) {
  let first_array = [];
  let second_array = [];
  let output = [];
  for(let i = 0; i < nums1.length; i += 1) {
    for(let k = 0; k < nums2.length; k += 1) {
      if (nums2[k] === nums1[i]){
        nums2.splice(i, k);
        nums1.splice(i, i);
      } 
    }
  }
  first_array = nums1;
  second_array = nums2;
  output.push(first_array, second_array);
  return output;
}

console.log(Sorting(nums1, nums2))
