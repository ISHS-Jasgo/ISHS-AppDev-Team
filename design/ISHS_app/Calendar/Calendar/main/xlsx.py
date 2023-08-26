import re
import pandas as pd





# functions
def xlsx_open(root):
    clean_data = pd.read_excel(root, engine='openpyxl').dropna(how='all')
    return clean_data

def xlsx_np_to_arr(np):
    array = []
    for d in np:
        col_arr = []
        for e in d:
            col_arr.append(e)
        array.append(col_arr)
    return array

# .xlsx 정제
# 엑셀 작성 규격 #빈 셀이 포함된 행은 오류 주의
# 열 | A, D, E => String | B, C => int{4}-int{2}-int{2}/int{2}:int{2} | #공백은 상관없음
# 행 | 1 => *except* | 2··· => 열 규격에 따름
data = xlsx_open("./main/static/xlsx/cel.xlsx")
data_np = data.to_numpy()
data_arr = xlsx_np_to_arr(data_np)
cda = []
for a in data_arr:
    a[1] = re.sub(r" ", "", a[1])
    a[2] = re.sub(r" ", "", a[2])
    match1 = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9]{2}:[0-9]{2}").search(a[1])
    match2 = re.compile(r"[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9]{2}:[0-9]{2}").search(a[2])
    du = ''
    if match1 and match2:
        a[1] = re.sub(r",0", ",", re.sub(r"[-/:]", ",", a[1]))
        a[2] = re.sub(r",0", ",", re.sub(r"[-/:]", ",", a[2]))
        k1 = a[1].split(',')
        k2 = a[2].split(',')
        for i in range(len(k1)):
            k1[i] = int(k1[i])
        for i in range(len(k2)):
            k2[i] = int(k2[i])
        if k1[4] > k2[4]:
            if k1[3] > k2[3]:
                if k1[2] > k2[2]:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k1[4] - k2[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k1[4] - k2[4])
                else:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k1[4] - k2[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k1[4] - k2[4])
            else:
                if k1[2] > k2[2]:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k1[4] - k2[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k1[4] - k2[4])
                else:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k1[4] - k2[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k1[4] - k2[4])
        else:
            if k1[3] > k2[3]:
                if k1[2] > k2[2]:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k2[4] - k1[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k2[4] - k1[4])
                else:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k2[4] - k1[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k1[3] - k2[3]) + ',' + str(k2[4] - k1[4])
            else:
                if k1[2] > k2[2]:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k2[4] - k1[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k1[2] - k2[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k2[4] - k1[4])
                else:
                    if k1[1] > k2[1]:
                        du = str(k2[0] - k1[0]) + ',' + str(k1[1] - k2[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k2[4] - k1[4])
                    else:
                        du = str(k2[0] - k1[0]) + ',' + str(k2[1] - k1[1]) + ',' + str(k2[2] - k1[2]) + ',' + str(k2[3] - k1[3]) + ',' + str(k2[4] - k1[4])
    cda.append([a[0], a[1], du, a[3], a[4]])

        
        
    
    


