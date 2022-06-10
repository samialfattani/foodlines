
drop function GET_STOCK_OF_LAST_VISIT(p_visit_id INTEGER, p_barcode varchar) CASCADE; --

select GET_STOCK_OF_LAST_VISIT(1, '9911');
select GET_STOCK_OF_LAST_VISIT(9, '9911'); 

CREATE OR REPLACE FUNCTION GET_STOCK_OF_LAST_VISIT(p_visit_id INTEGER, p_barcode varchar) 
RETURNS INTEGER AS 
$Q$
DECLARE 
    old_stock integer;
    lastVisitID integer;
BEGIN
    --get date of last visit

    -- the last visit before the passed visit
    SELECT v.id
    INTO lastVisitID
    FROM visits v, visits s
    WHERE s.id = p_visit_id
    AND v.customer_id = s.customer_id
    AND v.user_name = s.user_name    
    AND v.date < s.date
    order by v.date desc 
    limit 1;
    
    
    select 
        COALESCE( sum(count) FILTER (WhERE type = 'COUNT') ,0) +    
        COALESCE( sum(count) FILTER (WhERE type = 'SALE') ,0) -    
        COALESCE( sum(count) FILTER (WhERE type = 'RETURN') ,0) 
    into old_stock
    from moves m , items tm
    where  m.visit_id = lastVisitID
    AND    m.barcode = tm.barcode
    AND    m.barcode = p_barcode;

    RETURN old_stock;
END;
$Q$
LANGUAGE plpgsql 
STABLE 
RETURNS NULL ON NULL INPUT;




CREATE TRIGGER ON_CHANGE_OF_MOVES AFTER INSERT OR UPDATE OF count OR DELETE
    ON moves
    -- WHEN ( condition )
    FOR EACH ROW 
    EXECUTE PROCEDURE UPDATE_TOTAL_SALES_FOR_A_VISIT();


CREATE OR REPLACE FUNCTION UPDATE_TOTAL_SALES_FOR_A_VISIT(p_visit_id INTEGER)
RETURNS VOID AS 
$Q$
DECLARE 
    total integer;
BEGIN
    SELECT 
        sum((counts + sales - returns)*r.unit_price) as total_slaes
    INTO total
    FROM (
        select l.barcode ,l.unit_price,
                COALESCE( sum(m.count) FILTER (WhERE m.type = 'COUNT') ,0) "counts",
                COALESCE( sum(m.count) FILTER (WhERE m.type = 'SALE') ,0) "sales",
                COALESCE( sum(m.count) FILTER (WhERE m.type = 'RETURN') ,0) as "returns"
        from lines L, moves M
        where m.visit_id = l.visit_id AND m.barcode = l.barcode
        AND   l.visit_id = p_visit_id
        group BY l.barcode ,l.unit_price
    ) R;

    UPDATE visits SET total_sales = total 
    WHERE  visit_id = p_visit_id;
END;
$Q$
LANGUAGE plpgsql;