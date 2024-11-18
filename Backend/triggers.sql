DELIMITER $$

CREATE TRIGGER update_paper_balance
AFTER UPDATE ON setting
FOR EACH ROW
BEGIN
    DECLARE current_date DATE;
    SET current_date = CURDATE();

    IF NEW.supply_date <= current_date THEN
        UPDATE student
        SET paper_balance = paper_balance + NEW.page_number;
    END IF;
END$$

DELIMITER ;