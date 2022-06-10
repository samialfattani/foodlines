
select u.* from Users u;

Drop table customers;
create table customers(
    id serial primary key,
    name text,
    address json,
    contact json[]
);
insert into customers(name, address, contact) 
values ('Banda', '{"lat": 21.419536, "lng": 39.181855}',
array['
    {
        "name" : "Soma",
        "lst" :  [ "+966(917) 568-2909", "hewittacosta@interloo.com"]
    }
', '
    {
        "name" : "Hani",
        "lst" : [ "+966(870) 512-3243", "hewittandrews@interloo.com" ]
    }

']::json[] );

select * from customers;
select contact[2] from customers;


select spec->'pic'->'width', spec->>'forall' from posts;
select spec #>'{pic}', spec #>>'{pic}' from posts;

select comments[4]->'badges'->2 from posts;
select comments[4] #> '{badges}'  from posts;
select comments[4]->'badges'  from posts;
select comments[3]->'text', comments[3]->>'text', comments[3] #> 'text'  from posts;
select comments[3] ->>text from posts;

select '[{"a":"foo"},{"b":"bar"},{"c":"baz"}]'::json->2;



update visits set date = '2018-04-11' where date = '2018-05-09';
update visits set date = '2018-04-12' where date = '2018-04-11';


SELECT r.barcode, r.desc, r.unit_price, counts, sales, returns, old_stock, 
    old_stock - counts + returns as suggested,
    counts + sales - returns as stock
FROM (
    select items.barcode, items.desc, l.unit_price,
            COALESCE( sum(m.count) FILTER (WhERE m.type = 'COUNT') ,0) "counts",
            COALESCE( sum(m.count) FILTER (WhERE m.type = 'SALE') ,0) "sales",
            COALESCE( sum(m.count) FILTER (WhERE m.type = 'RETURN') ,0) as "returns",
            GET_STOCK_OF_LAST_VISIT(2, items.barcode)  old_stock				
    from lines l
    left outer join items on l.barcode = items.barcode 
    left join moves m  on l.visit_id  = m.visit_id AND l.barcode = m.barcode
    where l.visit_id = 2
    group BY items.barcode, items.desc ,l.unit_price
    order by 1) R;