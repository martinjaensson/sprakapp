${
	string Extends(Class c) {
		if (c.BaseClass != null)
			return "extends " + c.BaseClass.Name;
		else
			return "";
	}

    string Import(Class c) {
		if (c.BaseClass != null)
			return "import { " + c.BaseClass.Name + " } from './" + c.BaseClass.Name + "';";
		else
			return "";
	}

	string SanitizeName(string s) => s.Replace("Dto", "");
	string SanitizeClassName(Class c) => SanitizeName(c.Name.Replace("Dto", ""));  
	string SanitizeEnumName(Enum e) => SanitizeName(e.Name.Replace("Dto", ""));
	string SanitizePropertyTypeName(Property c) => SanitizeName(c.Type.Name.Replace("Dto", ""));
}

$Classes(Api.Models.*)[
$Import

/** 
	* Class $SanitizeClassName generated from $FullName
	*/
export class $SanitizeClassName $Extends { 
	$Properties[
    public $name: $SanitizePropertyTypeName;
	]
}
]

$Enums(Api.Dto.*)[ 
/**
	* Class $SanitizeEnumName generated from $FullName
	*/
export enum $SanitizeEnumName { 
	$Values[
        $Name = $Value,
	]
}
]