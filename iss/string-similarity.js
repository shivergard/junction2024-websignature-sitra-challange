function calculateStringSimilarity(str1, str2) {
    // Input validation
    if (!str1 || !str2 || !/^[1-9]+$/.test(str1) || !/^[1-9]+$/.test(str2)) {
        throw new Error("Inputs must be non-empty strings containing only digits 1-9");
    }

    // Split strings into arrays of digits
    const arr1 = str1.split('').map(Number);
    const arr2 = str2.split('').map(Number);

    // Calculate different aspects of similarity
    const positionScore = calculatePositionScore(arr1, arr2);
    const presenceScore = calculatePresenceScore(arr1, arr2);
    const sequenceScore = calculateSequenceScore(arr1, arr2);

    // Weighted average of different scores
    const finalScore = Math.round(
        0.4 * positionScore +  // Exact position matches
        0.3 * presenceScore +  // Same digits present
        0.3 * sequenceScore    // Sequential patterns
    );

    return Math.min(100, Math.max(0, finalScore));
}

// Score based on matching positions (40% weight)
function calculatePositionScore(arr1, arr2) {
    const maxLength = Math.max(arr1.length, arr2.length);
    let matches = 0;

    for (let i = 0; i < maxLength; i++) {
        if (arr1[i] === arr2[i]) {
            matches++;
        }
    }

    return (matches / maxLength) * 100;
}

// Score based on same digits present (30% weight)
function calculatePresenceScore(arr1, arr2) {
    const freq1 = new Array(10).fill(0);
    const freq2 = new Array(10).fill(0);

    // Count frequency of each digit
    arr1.forEach(digit => freq1[digit]++);
    arr2.forEach(digit => freq2[digit]++);

    // Calculate similarity based on frequency differences
    let similaritySum = 0;
    for (let i = 1; i <= 9; i++) {
        const minFreq = Math.min(freq1[i], freq2[i]);
        const maxFreq = Math.max(freq1[i], freq2[i]);
        if (maxFreq > 0) {
            similaritySum += minFreq / maxFreq;
        }
    }

    // Normalize by number of unique digits used
    const uniqueDigits = new Set([...arr1, ...arr2]).size;
    return (similaritySum / uniqueDigits) * 100;
}

// Score based on sequential patterns (30% weight)
function calculateSequenceScore(arr1, arr2) {
    const len1 = arr1.length;
    const len2 = arr2.length;
    
    // Find longest common subsequence length
    const lcs = findLCS(arr1, arr2);
    
    // Normalize by average length of both strings
    return (2 * lcs / (len1 + len2)) * 100;
}

// Helper function to find length of Longest Common Subsequence
function findLCS(arr1, arr2) {
    const m = arr1.length;
    const n = arr2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (arr1[i - 1] === arr2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// Test cases
const testCases = [
    { str1: "123", str2: "123", expected: 100 },    // Identical
    { str1: "123", str2: "321", expected: 60 },     // Same digits, different order
    { str1: "123", str2: "124", expected: 85 },     // One digit different
    { str1: "123", str2: "1234", expected: 75 },    // One string is longer
    { str1: "123", str2: "456", expected: 0 },      // Completely different
    { str1: "112233", str2: "112234", expected: 90 }, // Long string, one difference
];

// Run test cases
testCases.forEach((test, index) => {
    const score = calculateStringSimilarity(test.str1, test.str2);
    console.log(
        `Test ${index + 1}: "${test.str1}" vs "${test.str2}"`,
        `Score: ${score}`,
        `Expected: ${test.expected}`,
        score === test.expected ? '✓' : '✗'
    );
});
