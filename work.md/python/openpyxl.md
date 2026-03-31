# openpyxl

## combine

```py
import logging
import os
import re
import shutil
import sys
import time
import zipfile
from datetime import datetime, timezone
from pathlib import Path

from openpyxl import load_workbook, Workbook
from openpyxl.cell import MergedCell
from openpyxl.cell.rich_text import CellRichText, TextBlock
from openpyxl.utils import get_column_letter

zip_object = zipfile.ZipFile(full_file_path)
zip_object.extractall(folder_path)
zip_object.close()

new_workbook.create_sheet(title="new sheet name")

new_workbook["sheet1"].cell(1, 1).value = "Workbook Name"
new_workbook["sheet1"].sheet_properties.tabColor = "FDC9BF"
not_sheet.cell(not_sheet.max_row + 1, 1).value = workbook_name
value = some_cell.offset(0, 2).value
cell.row  cell.column  cell.coordinate  cell.value
sheet.max_column
sheet.max_row
cell.font.strike: boolean

some_object.copy()
validity = re.findall(r"\b\d{2}\.\d{2}\.\d{4}\b", validity_rng.value)
validity = re.search(r"\b\d{1}\.\d{2}\.\d{4}\b", validity_rng.value)
```

字符串转 datetime：

```py
effective_date_split = list(map(int, effective_date.split(".")))
effective_date = datetime(effective_date_split[2], effective_date_split[1], effective_date_split[0])
```

```py
def find_value_in_excel(find_workbook, sheet_name, value_to_find: str, match_whole_word=True, match_case=True, time_out=True):
    sheet = find_workbook[sheet_name]
    start_time = time.time()
    if not match_case:
        value_to_find = value_to_find.lower()
    for row in range(1, sheet.max_row + 1):
        if time_out:
            current_time = time.time()
            if current_time - start_time > 5:
                raise TimeoutError("find value in excel time out")

        if sheet.row_dimensions[row].hidden:
            continue
        for column in range(1, sheet.max_column + 1):
            if sheet.column_dimensions[get_column_letter(column)].hidden:
                continue
            cell = sheet.cell(row, column)
            cell_value = str(cell.value)
            if not match_case:
                cell_value = cell_value.lower()
            if match_whole_word:
                if cell_value == value_to_find:
                    return cell
            elif cell_value != "None" and (cell.data_type == "s" or cell.data_type == "n"):
                if value_to_find in cell_value:
                    return cell
    return None

def merged_value(sheet, row, col):
    cell = sheet.cell(row, col)
    if isinstance(cell, MergedCell):
        for mergecell in sheet.merged_cells.ranges:
            if cell.coordinate in mergecell:
                cell = sheet.cell(mergecell.min_row, mergecell.min_col)
                break
    return cell.value

def check_zip_file_only_have_folder(zip_object: zipfile.ZipFile):
    result = True
    info_list = zip_object.infolist()
    for info in info_list:
        if "/" not in info.filename:
            result = False
            break
    return result


def check_zip_all_file(zip_object: zipfile.ZipFile):
    result = True
    info_list = zip_object.infolist()
    for info in info_list:
        if info.is_dir() or "/" in info.filename:
            result = False
            break
    return result
```

## compare

```py
import logging
import os
import os.path
import re
import shutil
import sys
import zipfile
from concurrent.futures.process import ProcessPoolExecutor
from datetime import datetime, timezone

from openpyxl import Workbook

string1.isdigit()
string1.isalpha()
string1.isupper()
string1.startswith("test")

some_workbook["sheet1"].column_dimensions["A"].width = 50
some_workbook["sheet1"].append(["data"])

with ProcessPoolExecutor(max_workers=8) as executor:
    for key in key_list:
        future = executor.submit(compare_workbook, folder_path, old_workbook_path, new_workbook_path)
        futures[key] = future
    executor.shutdown(wait=True)

futures[key].result()
```

### util

```py
def get_sht_max_row(filepath):
    sheets = pd.ExcelFile(filepath, engine='openpyxl').sheet_names
    max_row_dict = {}

    with ThreadPoolExecutor() as executor:
        futures = {executor.submit(pd.read_excel, filepath, sheet_name=sheet, engine='openpyxl', header=None): sheet for
                   sheet in sheets}
        for future in as_completed(futures):
            sheet = futures[future]
            try:
                df = future.result()
                max_row = df.shape[0]
                max_row_dict[sheet] = max_row
            except Exception as exc:
                print('%r generated an exception: %s' % (sheet, exc))

    return max_row_dict
```

### common compare

```py
def copy_workbook(workbook_path, wb_sht_max_row: dict):
    value_workbook = load_workbook(workbook_path, keep_links=False, data_only=True)
    convert_workbook = load_workbook(workbook_path, keep_links=False, rich_text=True)
    new_workbook = Workbook()
    new_workbook.remove(new_workbook["Sheet"])

    for sheet in convert_workbook:
        if sheet.sheet_state != "hidden":
            if sheet.title in new_workbook.sheetnames:
                new_workbook.remove(new_workbook[sheet.title])
            new_workbook.create_sheet(sheet.title)
            max_row = wb_sht_max_row.get(sheet.title)
            copy_sheet(new_workbook[sheet.title], convert_workbook[sheet.title], value_workbook[sheet.title], max_row)

    return new_workbook

def format_workbook(workbook_path, wb_sht_max_row: dict):
    value_workbook = load_workbook(workbook_path, keep_links=False, data_only=True)
    convert_workbook = load_workbook(workbook_path, keep_links=False, rich_text=True)
    hidden_sheet_list = []
    for sheet in convert_workbook:
        if sheet.sheet_state == "hidden":
            hidden_sheet_list.append(sheet.title)
            continue
        max_row = wb_sht_max_row.get(sheet.title)
        max_column = sheet.max_column
        for row in range(1, max_row + 1):
            for column in range(1, max_column + 1):
                cell = sheet.cell(row, column)
                cell_value = cell.value
                if isinstance(cell, MergedCell):
                    continue
                if isinstance(cell_value, CellRichText):
                    transform_list = list(
                        filter(lambda x: isinstance(x, str) or (isinstance(x, TextBlock) and str(x).strip() != ""),
                               cell_value))
                    cell_value = CellRichText(*transform_list)

                if isinstance(cell_value, str):
                    cell_value = value_workbook[sheet.title].cell(row, column).value
                sheet.cell(row, column).value = cell_value
    for title in hidden_sheet_list:
        convert_workbook.remove(convert_workbook[title])

    return convert_workbook

def copy_sheet(dest_sheet, source_sheet, value_sheet, max_row):
    max_column = source_sheet.max_column

    for row in range(1, max_row + 1):
        for column in range(1, max_column + 1):
            cell_value = source_sheet.cell(row, column).value
            if isinstance(cell_value, CellRichText):
                transform_list = list(
                    filter(
                        lambda x: isinstance(x, str) or (isinstance(x, TextBlock) and x.text != " " and x.text != ""),
                        cell_value)
                )
                cell_value = CellRichText(*transform_list)

            if isinstance(cell_value, str) and cell_value[0] == "=":
                cell_value = value_sheet.cell(row, column).value

            dest_sheet.cell(row, column).value = cell_value
            copy_format(dest_sheet.cell(row, column), source_sheet.cell(row, column))

    # copy properties of column and row
    for column in range(1, max_column + 1):
        dest_sheet.column_dimensions[get_column_letter(column)].width = source_sheet.column_dimensions[
            get_column_letter(column)].width
        dest_sheet.column_dimensions[get_column_letter(column)].hidden = source_sheet.column_dimensions[
            get_column_letter(column)].hidden
    for row in range(1, max_row + 1):
        dest_sheet.row_dimensions[row].height = source_sheet.row_dimensions[row].height
        dest_sheet.row_dimensions[row].hidden = source_sheet.row_dimensions[row].hidden

    # merge cell
    for merged_range in source_sheet.merged_cells.ranges:
        dest_sheet.merge_cells(
            start_row=merged_range.min_row, start_column=merged_range.min_col, end_row=merged_range.max_row,
            end_column=merged_range.max_col
        )

    return max_row

def set_range_color(sheet, start_row, start_column, end_row, end_column, background_color, **kwargs):
    fill = PatternFill(start_color=background_color, end_color=background_color, fill_type="solid")
    font_color = kwargs.get("font_color", "")
    for row in range(start_row, end_row + 1):
        for column in range(start_column, end_column + 1):
            sheet.cell(row, column).fill = fill
            if font_color != "":
                sheet.cell(row, column).font = Font(font_color)

def copy_format(target_cell, source_cell):
    target_cell.fill = copy(source_cell.fill)
    if source_cell.has_style:
        target_cell.font = copy(source_cell.font)
        target_cell.border = copy(source_cell.border)
        target_cell.fill = copy(source_cell.fill)
        target_cell.number_format = copy(source_cell.number_format)
        target_cell.protection = copy(source_cell.protection)
        target_cell.alignment = copy(source_cell.alignment)

cell.fill = PatternFill(start_color="FFFF0000", end_color="FFFF0000", fill_type="solid")
cell.font = Font(color=colors.BLACK)

if isinstance(temp_text, TextBlock) and temp_text.font and temp_text.font.color and temp_text.font.color.value == "FFFF0000":
    temp_text.font.color =colors.BLACK

if isinstance(block, TextBlock):
    # Check if TextBlock has font with strike
    if block.font and hasattr(block.font, 'strike') and block.font.strike:
        return True


```
