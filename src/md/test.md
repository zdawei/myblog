# sql语句

1. select prod_name from products;
2. select prod_id, prod_name from products;
3. select * from products;
4. select distinct vend_id from products;
5. select prod_name from products limit 5;
6. select prod_name from products limit 5 offset 5;
7. select prod_name from products limit 3, 4;
8. `--` 这是一条注释
9. `#` 这是一条注释
10. `/*多行的块注释*/`
11. select prod_name from products order by prod_name;
12. select prod_name, prod_price, prod_id from products order by prod_price, prod_name;
13. select prod_id, prod_price, prod_name from products order by 2, 3;
14. select prod_id, prod_price, prod_name from products order by prod_price desc;
15. select prod_id, prod_price, prod_name from products order by prod_price desc, prod_name;
16. select prod_name, prod_price from products where prod_price = 3.49;
17. where的操作符可以看第四章
18. select prod_id, prod_price, prod_name from products where vend_id = 'DLL01' and prod_price <= 4;
19. select prod_id, prod_price, prod_name from products where vend_id = 'DLL01' or vend_id = 'BRS01';
20. or 和 and 组合语句时，优先处理and，可以用（）改变优先级;
21. select prod_id, prod_price, prod_name from products where vend_id in ('DLL01', 'BRS01') order by prod_name;
22. select prod_name from products where not vend_id = 'DLL01' order by prod_name;
23. select prod_name from products where not vend_id <> 'DLL01' order by prod_name;
24. select prod_id, prod_name from products where prod_name like 'Fish%';
25. select prod_id, prod_name from products where prod_name like 'Fish_';
26. select prod_id, prod_name from products where prod_name like 'Fish[jm]';
27. select prod_id, prod_name from products where prod_name like 'Fish[^jm]';
28. select concat(vend_name, '(', vend_country, ')') as vend_title from vendors order by vend_name;
29. select count(*) as num_items, min(prod_price) as price_min from produces;
30. select vend_id, count(*) as num_prods from products group by vend_id;
31. select cust_id, count(*) as orders from orders group by cust_id having count(*) >=2;
32. 语法顺序：seclet from where group by having order by ;
33. SELECT cust_id FROM Orders WHERE order_num IN (SELECT order_num FROM OrderItems WHERE prod_id = 'RGAN01');子查询
34. SELECT cust_name, cust_state, (SELECT COUNT(*) FROM Orders WHERE Orders.cust_id = Customers.cust_id) AS orders FROM Customers ORDER BY cust_name;计算字段的子查询
35. SELECT vend_name, prod_name, prod_price FROM Vendors, Products WHERE Vendors.vend_id = Products.vend_id;联结
36. INSERT INTO Customers(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country) VALUES('1000000006', 'Toy Land', '123 Any Street', 'New York', 'NY', '11111', 'USA');
37. INSERT SELECT INTO Customers(cust_id, cust_contact, cust_email, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country) select cust_id, cust_contact, cust_email, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country FROM CustNew;
38. create table custcopy as select * from customers;
39. update customers set cust_contact = 'Sam Roberts', cust_email = '123@sldf.com' where cust_id='23324';
40. delete from customers where cust_id='23324';
41. CREATE TABLE OrderItems(order_num integer not null,	order_item integer not null,	prod_id char(10) not null,	quantity integer not null default CURRENT_DATE(),	item_price decimal(8, 2) not null);
42. ALTER TABLE Vendors ADD vend_phone CHAR(20);
43. ALTER TABLE Vendors DROP COLUMN vend_phone;
44. drop table custcopy;
45. create table orders (
	order_num integer not null primary key,
	order_date datetime not null,
	cust_id char(10) not null REFERENCES customers(cust_id)
);