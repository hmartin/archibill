archibill
=========

Archibill

page 1: home => sub header: if not email in red(p4) / no account in orange(p4) / nb doc in green) + menu
page 2: set category + save and back home / take it again / (v2) multiple pages
page 3: manage category (add/remove/(v2)default category)
page 4: option => menu option
page 5: display category + archive

pop 1: tips with check box don't display again and a1 link 

a1: take picture next p2
a2: send archive

menu: take picture (p5) / manage category(p3) / option(p4) / (v2)find a archive (p5) / send me all archive(a2)
menu option: email / create account / auto save (phone only / web only / phone and web)

local storage:
email
showTips
idPass

hard dev: 
- async svg
- database category
- user email only / user with pass

if user_id {
	if test connection {
		if test localbdd {
			up<=>
		} else {
			up<=
		}
	}	
}
Si non:
test bdd
