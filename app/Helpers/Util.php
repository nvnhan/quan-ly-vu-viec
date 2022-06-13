<?php

namespace App\Helpers;

/**
 * 
 */
class Util
{
	public static function slugify($str)
	{
		$str = mb_strtolower($str);
		$str = preg_replace('/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/', 'a', $str);
		$str = preg_replace('/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/', 'e', $str);
		$str = preg_replace('/(ì|í|ị|ỉ|ĩ)/', 'i', $str);
		$str = preg_replace('/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/', 'o', $str);
		$str = preg_replace('/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/', 'u', $str);
		$str = preg_replace('/(ỳ|ý|ỵ|ỷ|ỹ)/', 'y', $str);
		$str = preg_replace('/(đ)/', 'd', $str);

		// $str = preg_replace('/[^a-z0-9-\s]/', '', $str);
		$str = preg_replace('/[^a-z-\s]/', '', $str);
		$str = preg_replace('/([\s]+)/', '-', $str);

		// remove unwanted characters
		$str = preg_replace('~[^-\w]+~', '', $str);

		// remove duplicate -
		$str = preg_replace('~-+~', '-', $str);

		// trim
		$str = trim($str, '-');

		return $str;
	}

	public static function updateDotEnv($key, $newValue, $delim = '"')
	{
		$path = base_path('.env');
		// get old value from current env
		$oldValue = env($key);

		// was there any change?
		if ($oldValue === $newValue) {
			return;
		}

		// Old value is empty OR not contains '  ' 
		if (!$oldValue || $oldValue == "" || strpos($oldValue, ' ') < 0)
			$newValue = '"' . $newValue . '"';

		// rewrite file content with changed data
		if (file_exists($path)) {
			// replace current value with new value 
			file_put_contents(
				$path,
				str_replace(
					[$key . '=' . $oldValue, $key . '=' . $delim . $oldValue . $delim, '""'],
					[$key . '=' . $newValue, $key . '=' . $delim . $newValue . $delim, ''],
					file_get_contents($path)
				)
			);
		}
	}

	public static function formatBytes($bytes, $precision = 2)
	{
		$units = array('B', 'KB', 'MB', 'GB', 'TB');

		$bytes = max($bytes, 0);
		$pow = floor(($bytes ? log($bytes) : 0) / log(1024));
		$pow = min($pow, count($units) - 1);

		// Uncomment one of the following alternatives
		$bytes /= pow(1024, $pow);
		// $bytes /= (1 << (10 * $pow)); 

		return round($bytes, $precision) . ' ' . $units[$pow];
	}
}
