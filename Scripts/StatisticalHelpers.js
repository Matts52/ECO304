/******** HELPER FUNCTIONS ********/

//view-source:https://www.math.ucla.edu/~tom/distributions/normal.html
function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001
	var T=1/(1+.2316419*Math.abs(X));
	var D=.3989423*Math.exp(-X*X/2);
	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
	if (X>0) {
		Prob=1-Prob
	}
	return Prob
}  

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* next three functions from https://www.math.ucla.edu/~tom/distributions/tDist.html */
function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG
}

function Betinc(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>.00001) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	}
	return A1/A
}

function compute_tdist(X, df) {
    with (Math) {
		if (df<=0) {
			alert("Degrees of freedom must be positive")
		} else {
			A=df/2;
			S=A+.5;
			Z=df/(df+X*X);
			BT=exp(LogGamma(S)-LogGamma(.5)-LogGamma(A)+A*log(Z)+.5*log(1-Z));
			if (Z<(A+1)/(S+2)) {
				betacdf=BT*Betinc(Z,A,.5)
			} else {
				betacdf=1-BT*Betinc(1-Z,.5,A)
			}
			if (X<0) {
				tcdf=betacdf/2
			} else {
				tcdf=1-betacdf/2
			}
		}
		tcdf=round(tcdf*100000)/100000;
	}
    return tcdf;
}


/* https://gist.github.com/benrasmusen/1261977 for helper functions in calulcating t critical values */

function tdistr ($n, $p) {
	if ($n <= 0 || Math.abs($n) - Math.abs(integer($n)) != 0) {
		throw("Invalid n: $n\n");
	}
	if ($p <= 0 || $p >= 1) {
		throw("Invalid p: $p\n");
	}
	return precision_string(_subt($n-0, $p-0));
}

   
function _subt ($n, $p) {

	if ($p >= 1 || $p <= 0) {
		throw("Invalid p: $p\n");
	}

	if ($p == 0.5) {
		return 0;
	} else if ($p < 0.5) {
		return - _subt($n, 1 - $p);
	}

	var $u = _subu($p);
	var $u2 = Math.pow($u, 2);

	var $a = ($u2 + 1) / 4;
	var $b = ((5 * $u2 + 16) * $u2 + 3) / 96;
	var $c = (((3 * $u2 + 19) * $u2 + 17) * $u2 - 15) / 384;
	var $d = ((((79 * $u2 + 776) * $u2 + 1482) * $u2 - 1920) * $u2 - 945) 
				/ 92160;
	var $e = (((((27 * $u2 + 339) * $u2 + 930) * $u2 - 1782) * $u2 - 765) * $u2
			+ 17955) / 368640;

	var $x = $u * (1 + ($a + ($b + ($c + ($d + $e / $n) / $n) / $n) / $n) / $n);

	if ($n <= Math.pow(log10($p), 2) + 3) {
		var $round;
		do { 
			var $p1 = _subtprob($n, $x);
			var $n1 = $n + 1;
			var $delta = ($p1 - $p) 
				/ Math.exp(($n1 * Math.log($n1 / ($n + $x * $x)) 
					+ Math.log($n/$n1/2/Math.PI) - 1 
					+ (1/$n1 - 1/$n) / 6) / 2);
			$x += $delta;
			$round = round_to_precision($delta, Math.abs(integer(log10(Math.abs($x))-4)));
		} while (($x) && ($round != 0));
	}
	return $x;
}

function _subtprob ($n, $x) {

	var $a;
        var $b;
	var $w = Math.atan2($x / Math.sqrt($n), 1);
	var $z = Math.pow(Math.cos($w), 2);
	var $y = 1;

	for (var $i = $n-2; $i >= 2; $i -= 2) {
		$y = 1 + ($i-1) / $i * $z * $y;
	} 

	if ($n % 2 == 0) {
		$a = Math.sin($w)/2;
		$b = .5;
	} else {
		$a = ($n == 1) ? 0 : Math.sin($w)*Math.cos($w)/Math.PI;
		$b= .5 + $w/Math.PI;
	}
	return max(0, 1 - $b - $a * $y);
}

function _subf ($n, $m, $p) {
	var $x;

	if ($p >= 1 || $p <= 0) {
		throw("Invalid p: $p\n");
	}

	if ($p == 1) {
		$x = 0;
	} else if ($m == 1) {
		$x = 1 / Math.pow(_subt($n, 0.5 - $p / 2), 2);
	} else if ($n == 1) {
		$x = Math.pow(_subt($m, $p/2), 2);
	} else if ($m == 2) {
		var $u = _subchisqr($m, 1 - $p);
		var $a = $m - 2;
		$x = 1 / ($u / $m * (1 +
			(($u - $a) / 2 +
				(((4 * $u - 11 * $a) * $u + $a * (7 * $m - 10)) / 24 +
					(((2 * $u - 10 * $a) * $u + $a * (17 * $m - 26)) * $u
						- $a * $a * (9 * $m - 6)
					)/48/$n
				)/$n
			)/$n));
	} else if ($n > $m) {
		$x = 1 / _subf2($m, $n, 1 - $p)
	} else {
		$x = _subf2($n, $m, $p)
	}
	return $x;
}

function _subu ($p) {
	var $y = -Math.log(4 * $p * (1 - $p));
	var $x = Math.sqrt(
		$y * (1.570796288
		  + $y * (.03706987906
		  	+ $y * (-.8364353589E-3
			  + $y *(-.2250947176E-3
			  	+ $y * (.6841218299E-5
				  + $y * (0.5824238515E-5
					+ $y * (-.104527497E-5
					  + $y * (.8360937017E-7
						+ $y * (-.3231081277E-8
						  + $y * (.3657763036E-10
							+ $y *.6936233982E-12)))))))))));
	if ($p>.5)
                $x = -$x;
	return $x;
}


function integer ($i) {
  if ($i > 0)
          return Math.floor($i);
  else
          return Math.ceil($i);
}


function precision_string ($x) {
	if ($x) {
		return round_to_precision($x, precision($x));
	} else {
		return "0";
	}
}

function round_to_precision ($x, $p) {
        $x = $x * Math.pow(10, $p);
        $x = Math.round($x);
        return $x / Math.pow(10, $p);
}

function log10 ($n) {
	return Math.log($n) / Math.log(10);
}

function precision ($x) {
	return Math.abs(integer(log10(Math.abs($x)) - 5));
}

function chisqrdistr ($n, $p) {
	if ($n <= 0 || Math.abs($n) - Math.abs(integer($n)) != 0) {
		throw("Invalid n: $n\n"); /* degree of freedom */
	}
	if ($p <= 0 || $p > 1) {
		throw("Invalid p: $p\n"); 
	}
	return precision_string(_subchisqr($n-0, $p-0));
}

function _subchisqr ($n, $p) {
	var $x;

	if (($p > 1) || ($p <= 0)) {
		throw("Invalid p: $p\n");
	} else if ($p == 1){
		$x = 0;
	} else if ($n == 1) {
		$x = Math.pow(_subu($p / 2), 2);
	} else if ($n == 2) {
		$x = -2 * Math.log($p);
	} else {
		var $u = _subu($p);
		var $u2 = $u * $u;

		$x = Math.max(0, $n + Math.sqrt(2 * $n) * $u 
			+ 2/3 * ($u2 - 1)
			+ $u * ($u2 - 7) / 9 / Math.sqrt(2 * $n)
			- 2/405 / $n * ($u2 * (3 *$u2 + 7) - 16));

		if ($n <= 100) {
			var $x0;
                        var $p1;
                        var $z;
			do {
				$x0 = $x;
				if ($x < 0) {
					$p1 = 1;
				} else if ($n>100) {
					$p1 = _subuprob((Math.pow(($x / $n), (1/3)) - (1 - 2/9/$n))
						/ Math.sqrt(2/9/$n));
				} else if ($x>400) {
					$p1 = 0;
				} else {
					var $i0
                                        var $a;
					if (($n % 2) != 0) {
						$p1 = 2 * _subuprob(Math.sqrt($x));
						$a = Math.sqrt(2/Math.PI) * Math.exp(-$x/2) / Math.sqrt($x);
						$i0 = 1;
					} else {
						$p1 = $a = Math.exp(-$x/2);
						$i0 = 2;
					}

					for (var $i = $i0; $i <= $n-2; $i += 2) {
						$a *= $x / $i;
						$p1 += $a;
					}
				}
				$z = Math.exp((($n-1) * Math.log($x/$n) - Math.log(4*Math.PI*$x) 
					+ $n - $x - 1/$n/6) / 2);
				$x += ($p1 - $p) / $z;
				$x = round_to_precision($x, 5);
			} while (($n < 31) && (Math.abs($x0 - $x) > 1e-4));
		}
	}
	return $x;
}

function _subuprob ($x) {
	var $p = 0; /* if ($absx > 100) */
	var $absx = Math.abs($x);

	if ($absx < 1.9) {
		$p = Math.pow((1 +
			$absx * (.049867347
			  + $absx * (.0211410061
			  	+ $absx * (.0032776263
				  + $absx * (.0000380036
					+ $absx * (.0000488906
					  + $absx * .000005383)))))), -16)/2;
	} else if ($absx <= 100) {
		for (var $i = 18; $i >= 1; $i--) {
			$p = $i / ($absx + $p);
		}
		$p = Math.exp(-.5 * $absx * $absx) 
			/ Math.sqrt(2 * Math.PI) / ($absx + $p);
	}

	if ($x<0)
        	$p = 1 - $p;
	return $p;
}